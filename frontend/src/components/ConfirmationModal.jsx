import React from "react";

const ConfirmationDialog = ({ isVisible, todo, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to remove this item?</p>
        <p>
          Name: <span className="font-semibold">{todo.text}</span>{" "}
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
