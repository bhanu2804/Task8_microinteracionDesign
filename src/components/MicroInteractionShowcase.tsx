import { useState } from "react";
import { Card } from "./ui/card";
import { FileUploadInteraction } from "./microinteractions/FileUploadInteraction";
import { LikeButtonInteraction } from "./microinteractions/LikeButtonInteraction";
import { FormSubmitInteraction } from "./microinteractions/FormSubmitInteraction";
import { RefreshInteraction } from "./microinteractions/RefreshInteraction";
import { ToggleInteraction } from "./microinteractions/ToggleInteraction";
import { AddToCartInteraction } from "./microinteractions/AddToCartInteraction";

export function MicroInteractionShowcase() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-slate-900 mb-3">Micro-Interaction Design Showcase</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore advanced UI design with carefully crafted micro-interactions featuring smooth transitions,
          timing, and feedback across different states.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* File Upload */}
        <Card className="p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-slate-900 mb-2">File Upload</h3>
            <p className="text-slate-600 text-sm">
              States: Idle → Uploading → Success
            </p>
          </div>
          <FileUploadInteraction />
        </Card>

        {/* Like Button */}
        <Card className="p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-slate-900 mb-2">Like Button</h3>
            <p className="text-slate-600 text-sm">
              States: Unliked → Liked (with bounce animation)
            </p>
          </div>
          <LikeButtonInteraction />
        </Card>

        {/* Form Submit */}
        <Card className="p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-slate-900 mb-2">Form Submission</h3>
            <p className="text-slate-600 text-sm">
              States: Idle → Loading → Success → Reset
            </p>
          </div>
          <FormSubmitInteraction />
        </Card>

        {/* Refresh */}
        <Card className="p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-slate-900 mb-2">Refresh Action</h3>
            <p className="text-slate-600 text-sm">
              States: Idle → Refreshing → Complete
            </p>
          </div>
          <RefreshInteraction />
        </Card>

        {/* Toggle Switch */}
        <Card className="p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-slate-900 mb-2">Animated Toggle</h3>
            <p className="text-slate-600 text-sm">
              States: Off → On (with morphing animation)
            </p>
          </div>
          <ToggleInteraction />
        </Card>

        {/* Add to Cart */}
        <Card className="p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-slate-900 mb-2">Add to Cart</h3>
            <p className="text-slate-600 text-sm">
              States: Idle → Adding → Success → Idle
            </p>
          </div>
          <AddToCartInteraction />
        </Card>
      </div>

      {/* Design Principles */}
      <Card className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
        <h3 className="text-slate-900 mb-4">Micro-Interaction Design Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mb-3">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-slate-900 mb-2">Timing</h4>
            <p className="text-slate-600 text-sm">
              Carefully calibrated durations (200-400ms) that feel natural and responsive without being sluggish.
            </p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mb-3">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <h4 className="text-slate-900 mb-2">Motion</h4>
            <p className="text-slate-600 text-sm">
              Smooth easing curves and spring physics create delightful, organic movements that guide user attention.
            </p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 mb-3">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h4 className="text-slate-900 mb-2">Feedback</h4>
            <p className="text-slate-600 text-sm">
              Clear visual and state indicators ensure users understand the result of their actions immediately.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
