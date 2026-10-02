"use client";

import React, { useRef, useState } from "react";
import { Camera, RefreshCw, Check, Upload, X } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const startCamera = async () => {
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.warn("Camera access fallback:", err);
      setErrorMsg("Webcam access unavailable or permission denied. Use file upload fallback below.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const snapPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(dataUrl);
        stopCamera();
        onCapture(dataUrl);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setCapturedImage(dataUrl);
        onCapture(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Captured Image Preview */}
      {capturedImage ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-impact-500 shadow-md bg-black max-h-64 flex items-center justify-center">
          <img src={capturedImage} alt="Captured evidence" className="w-full h-56 object-cover" />
          <button
            type="button"
            onClick={() => {
              setCapturedImage(null);
              startCamera();
            }}
            className="absolute top-3 right-3 p-2 bg-navy-900/80 text-white rounded-full hover:bg-navy-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-3 bg-impact-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" /> Photo Evidence Captured
          </div>
        </div>
      ) : isCameraActive ? (
        /* Live Viewfinder */
        <div className="relative rounded-2xl overflow-hidden border-2 border-impact-500 shadow-md bg-black">
          <video ref={videoRef} className="w-full h-64 object-cover" playsInline muted />
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={snapPhoto}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-impact-500 hover:bg-impact-600 text-white font-extrabold text-xs shadow-lg transition transform active:scale-95"
            >
              <Camera className="w-4 h-4" /> Snap Photo Frame
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="px-4 py-2.5 rounded-full bg-navy-900/80 hover:bg-navy-900 text-white font-bold text-xs backdrop-blur transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* Camera Trigger Buttons */
        <div className="p-6 rounded-2xl border-2 border-dashed border-impact-500/40 bg-impact-50/20 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-impact-500 text-white flex items-center justify-center mx-auto shadow-glowGreen">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-navy-900 text-base">Capture Resource Evidence Photo</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Use live device camera or upload image for AI category classification and confidence scoring.
            </p>
          </div>

          {errorMsg && (
            <p className="text-xs text-amberCustom-600 font-semibold bg-amberCustom-50 p-2.5 rounded-xl border border-amberCustom-500/20">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={startCamera}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-impact-500 hover:bg-impact-600 text-white font-extrabold text-xs shadow-md transition transform hover:-translate-y-0.5"
            >
              <Camera className="w-4 h-4" /> Open Web Camera
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-borderCustom hover:bg-canvas text-navy-900 font-extrabold text-xs shadow-card transition"
            >
              <Upload className="w-4 h-4 text-route-500" /> Choose Photo from Device
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
