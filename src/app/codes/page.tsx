"use client";
import React, { useState } from 'react';
import { TiTickOutline } from "react-icons/ti";
import TitleTextBox from "@/components/TitleTextBox";
import { ClipboardCopy } from "lucide-react";

export default function CodesPage() {
  // Track which code's clipboard button was clicked
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  
  const [codes, setCodes] = useState([
    { id: 1, name: "WELCOME50", rewards: ["50% Off", "Free Shipping"], dateAdded: "2025-02-15", isActive: true },
    { id: 2, name: "SUMMER2025", rewards: ["25% Off"], dateAdded: "2025-02-10", isActive: true },
    { id: 3, name: "BLACKFRIDAY", rewards: ["70% Off", "$10 Credit"], dateAdded: "2024-11-20", isActive: false },
    { id: 4, name: "NEWYEAR2025", rewards: ["15% Off", "Free Gift"], dateAdded: "2025-01-01", isActive: false },
  ]);

  const copyToClipboard = (text, codeId) => {
    // Using try-catch block to handle potential errors
    try {
      // Only attempt to use clipboard API if it's available
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
          .then(() => {
            // Set the copied code ID to show the tick icon
            setCopiedCodeId(codeId);
            
            // Reset the icon back to clipboard after 2 seconds
            setTimeout(() => {
              setCopiedCodeId(null);
            }, 2000);
            
            console.log('Copied to clipboard!');
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';  // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setCopiedCodeId(codeId);
            setTimeout(() => setCopiedCodeId(null), 2000);
            console.log('Fallback: Copied to clipboard!');
          } else {
            console.error('Fallback: Unable to copy');
          }
        } catch (err) {
          console.error('Fallback: Error copying text: ', err);
        }
        
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error('Error in copyToClipboard function:', error);
    }
  };

  return (
    <div className="p-6">
      <TitleTextBox title="Codes" description="List of codes" />
      
      <div className="mt-6 overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[var(--primary)] text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Copy
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Rewards
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date Added
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {codes.map((code) => (
              <tr key={code.id} className={code.isActive ? "bg-white" : "bg-[var(--primary)]"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {code.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => copyToClipboard(code.name, code.id)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none relative"
                  >
                    <div className="transition-all duration-300 ease-in-out">
                      {copiedCodeId === code.id ? (
                        <div className="animate-fade-in transition-transform duration-300 transform scale-110">
                          <TiTickOutline size={18} className="text-green-600" />
                        </div>
                      ) : (
                        <div className="transition-transform duration-300">
                          <ClipboardCopy size={18} />
                        </div>
                      )}
                    </div>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    {code.rewards.map((reward, index) => (
                      <li key={index}>{reward}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(code.dateAdded).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    code.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {code.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
