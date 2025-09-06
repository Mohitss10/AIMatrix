import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm 
                 bg-slate-900/10
                 border border-gray-700 
                 rounded-lg cursor-pointer 
                 shadow-lg shadow-black/30 
                 transition-transform duration-200 hover:scale-[1.01]"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-white font-semibold">{item.prompt}</h2>
          <p className="text-gray-400">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-md">
          {item.type}
        </button>
      </div>
      {expanded && (
        <div>
          {item.type === 'image' ? (
            <div>
              <img
                src={item.content}
                alt=""
                className="mt-3 w-full max-w-md rounded-lg border border-gray-700"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-gray-300">
              <div className="reset-tw prose prose-invert">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem
