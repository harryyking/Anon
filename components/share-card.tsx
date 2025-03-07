"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { CheckCircle, Copy, MessageSquare, Link as LinkIcon, Share2 } from 'lucide-react'
import { User } from '@prisma/client'
import Link from 'next/link'

const ShareCard = ({user}: {user : User}) => {
  const [copied, setCopied] = useState(false)
  const profileLink = `anon-peach.vercel.app/${user.slug}`
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${profileLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="card w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
      {/* User Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              {user.image ? (
                <img 
                  src={user.image}
                  alt={user.name || "User"}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-primary text-neutral text-xl font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name || "User"}</h2>
            {user.email && (
              <p className="text-gray-500 text-sm">{user.email}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="card-body p-6 space-y-4">
        {/* Share Link */}
        <div className="bg-gray-100 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            <LinkIcon size={18} className="text-gray-500 flex-shrink-0 mr-2" />
            <span className="text-gray-700 font-medium text-sm truncate">
              {profileLink}
            </span>
          </div>
          <button 
            onClick={handleCopyLink} 
            className={`btn btn-sm ${copied ? 'btn-success' : 'btn-primary'} ml-2 flex-shrink-0`}
          >
            {copied ? (
              <>
                <CheckCircle size={16} />
                <span className="ml-1">Copied</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span className="ml-1">Copy</span>
              </>
            )}
          </button>
        </div>
        
        {/* Instructions */}
        <div className="bg-base-200 rounded-xl p-4">
          <p className="text-center text-gray-700">
            Share this link with friends to get anonymous feedback
          </p>
        </div>
        
        {/* Sharing Options */}
        <div className="pt-2">
          <h3 className="font-semibold mb-3 text-gray-700">Share via</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* WhatsApp */}
            <a 
              href={`https://wa.me/?text=Send%20me%20anonymous%20feedback%20at%20https://${profileLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25D366] text-white border-[#25D366] hover:bg-[#128C7E] hover:border-[#128C7E]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            
            {/* Instagram */}
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`https://${profileLink}`);
                alert('Link copied! Open Instagram and paste in your story or DM');
              }}
              className="btn bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white border-none hover:opacity-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </button>
            
            {/* Facebook */}
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=https://${profileLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#1A77F2] text-white border-[#005fd8] hover:bg-[#0e5bb7] hover:border-[#004aad]"
            >
              <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path>
              </svg>
              <span>Facebook</span>
            </a>
            
            {/* X (Twitter) */}
            <a 
              href={`https://twitter.com/intent/tweet?url=https://${profileLink}&text=Send%20me%20anonymous%20feedback`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-black text-white border-black hover:bg-gray-800 hover:border-gray-800"
            >
              <svg aria-label="X logo" width="16" height="12" viewBox="0 0 300 271" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/>
              </svg>
              <span>X</span>
            </a>
          </div>
        </div>
        
        {/* View Messages Button */}
        <Link className="btn btn-primary w-full mt-4" href={`https://${profileLink}`}>
          <MessageSquare size={18} className="mr-2" />
          View Anonymous Messages
        </Link>
      </div>
    </div>
  )
}

export default ShareCard