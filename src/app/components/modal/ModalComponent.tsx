import React from "react";

export default function ModalComponent({
    modalContent,
    modalFooter,
}:Readonly<{
    modalContent: any,
    modalFooter: any,
}>){
    return (
        <div id="MainModal" className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4">
                            <div className="w-full">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    {modalContent}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right">
                            {modalFooter}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}