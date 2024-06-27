// import React, { useState } from 'react';
// import Modal from '../../../components/common/Modal';

// function PaymentMdl({ open, setOpen, setFormData, formData }) {
//     const paymentDetails = structuredClone(formData.payment_json);
//     const [pmtDtls, setPmtDtls] = useState(paymentDetails);

//     const handleChange = (e) => {
//         setPmtDtls({
//             ...pmtDtls,
//             [e.target.name]: e.target.value,
//         });
//     };

//     return (
//         <Modal open={open} handleModal={() => setOpen(!open)}>
//             <div
//                 className="modal fade show"
//                 id="add_creditCard"
//                 tabIndex="-1"
//                 aria-labelledby="exampleModalLabel"
//                 aria-hidden="true"
//                 style={{ display: 'block' }}
//             >
//                 <div
//                     className="modal-dialog modal-center"
//                     style={{
//                         width: '60%',
//                     }}
//                 >
//                     <div className="modal-content w-100">
//                         <div className="modal-header d-flex justify-content-between">
//                             <div className="row">
//                                 <h5
//                                     className="modal-title headline-h6m"
//                                     id="exampleModalLabel"
//                                 >
//                                     Receipt Collection
//                                 </h5>
//                                 <div>Reservation Number: RS1234</div>
//                             </div>

//                             <div className="d-flex gap-4 align-items-center">
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     data-bs-dismiss="modal"
//                                     aria-label="Close"
//                                     onClick={() => {
//                                         setPmtDtls(null);
//                                         setOpen(false);
//                                     }}
//                                 ></button>
//                             </div>
//                         </div>
//                         <div className="modal-body">
//                             {/* <div className="row mx-0">
//                                 <div className="col-12 px-0">
//                                     <div className="form-group mb-3">
//                                         <label
//                                             htmlFor="customInput"
//                                             className="custom-label"
//                                         >
//                                             Payment Type
//                                         </label>
//                                         <select
//                                             className="form-select custom-input-lg"
//                                             name="pay_type"
//                                             value={pmtDtls?.pay_type}
//                                             onChange={handleChange}
//                                             required
//                                         >
//                                             <option value="">
//                                                 Select Payment Type
//                                             </option>
//                                             <option value="Cash">Cash</option>
//                                             <option value="UPI">UPI</option>
//                                             <option value="Card">Card</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="col-12 px-0">
//                                     <div className="form-group mb-3">
//                                         <label
//                                             htmlFor="customInput"
//                                             className="custom-label"
//                                         >
//                                             REC/Vou#
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control custom-input-lg"
//                                             id="customInput"
//                                             placeholder="Card Holder Name"
//                                             name="ref_name"
//                                             value={pmtDtls?.ref_name}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-7 px-0">
//                                     <div className="form-group mb-3">
//                                         <label
//                                             htmlFor="customInput"
//                                             className="custom-label"
//                                         >
//                                             Amount
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control custom-input-lg"
//                                             id="customInput"
//                                             placeholder="Enter amount"
//                                             name="pay_amnt"
//                                             value={pmtDtls?.pay_amnt}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                             </div> */}
//                         </div>
//                         <div className="modal-footer">
//                             <button
//                                 type="button"
//                                 className="btn btn-outline"
//                                 onClick={() => {
//                                     setPmtDtls(null);
//                                     setOpen(false);
//                                 }}
//                             >
//                                 Close
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="btn btn-primary"
//                                 onClick={() => {
//                                     setFormData({
//                                         ...formData,
//                                         payment_json: pmtDtls,
//                                     });
//                                     setOpen(false);
//                                 }}
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Modal>
//     );
// }

// export default PaymentMdl;

import React, { useEffect, useState } from 'react';
import Modal from '../../../components/common/Modal';
import toast from 'react-hot-toast';

function PaymentMdl({ open, setOpen, setFormData, formData, totalAmount }) {
    const paymentDetails = structuredClone(formData.payment_json);
    const [pmtDtls, setPmtDtls] = useState(paymentDetails);

    const handleChange = (e) => {
        setPmtDtls({
            ...pmtDtls,
            [e.target.name]: e.target.value,
        });
    };

    const [dueAmount, setDueAmount] = useState(0);

    const [paymentMethods, setPaymentMethods] = useState([
        { method: 'Cash', active: false },
        { method: 'Gpay', active: false },
        { method: 'SBI', active: false },
        { method: 'HDFC', active: false },
        { method: 'Paytm', active: false },
        { method: 'Phone pe', active: false },
    ]);

    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);

    useEffect(() => {
        var totalDueAmount = 0;

        for (let i = 0; i < selectedPaymentMethods.length; i++) {
            totalDueAmount += parseFloat(selectedPaymentMethods[i].amount);
        }

        const dueAmt =
            parseFloat(totalAmount) -
            parseFloat(totalDueAmount ? totalDueAmount : 0);

        if (dueAmt < 0) {
            toast.error('Amount should not exceed total amount');
            setDueAmount(0);
        } else {
            setDueAmount(dueAmt);
        }

        setPmtDtls({
            ...pmtDtls,
            pay_amnt: totalDueAmount,
        })
    }, [selectedPaymentMethods]);

    return (
        <Modal open={open} handleModal={() => setOpen(!open)}>
            <div
                className="modal fade show"
                id="add_creditCard"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div
                    className="modal-dialog modal-center"
                    style={{
                        minWidth: '50%',
                    }}
                >
                    <div className="modal-content w-100">
                        <div className="modal-header d-flex justify-content-between">
                            <div className="row">
                                <h5
                                    className="modal-title headline-h6m"
                                    id="exampleModalLabel"
                                >
                                    Receipt Collection
                                </h5>
                                <div>Reservation Number: RS1234</div>
                            </div>

                            <div className="d-flex gap-4 align-items-center">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        setPmtDtls(null);
                                        setOpen(false);
                                    }}
                                ></button>
                            </div>
                        </div>
                        <div className="modal-body">
                            {/* <div
                                className="col-2 card px-0 p-2"
                                style={{
                                    minHeight: 'calc(50vh - 100px)',
                                }}
                            >
                                <div className="row m-0">
                                    <div className="col-12 d-flex align-items-center">
                                        <div className="col-12 d-flex gap-2 flex-column align-items-end">
                                            <h6
                                                className={`subtitle-1m mb-0 py-2 px-3 cp w-100 d-flex align-items-center gap-2 btn-h48`}
                                                // onClick={() =>
                                                //     setActiveButton('country')
                                                // }
                                            >
                                                Country
                                                <span
                                                    className={`subtitle-1m `}
                                                >
                                                    3
                                                </span>
                                            </h6>

                                            <h6
                                                className={`subtitle-1m mb-0 p-2 px-3 cp w-100 d-flex align-items-center gap-2 btn-h48 `}
                                                // onClick={() => setActiveButton('state')}
                                            >
                                                State
                                                <span
                                                    className={`subtitle-1m `}
                                                >
                                                    2
                                                </span>
                                            </h6>

                                            <h6
                                                className={`subtitle-1m mb-0 p-2 px-3 cp w-100 d-flex align-items-center gap-2 btn-h48 `}
                                                // onClick={() => setActiveButton('city')}
                                            >
                                                City
                                                <span
                                                    className={`subtitle-1m `}
                                                >
                                                    1
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="receipt-collection-container">
                                <div className="payment-methods-sidebar">
                                    {paymentMethods.map((method, index) => {
                                        return (
                                            <button
                                                type="button"
                                                className={`method-item ${method.active && 'active'}`}
                                                key={index}
                                                onClick={() => {
                                                    const updatedMethods = [
                                                        ...paymentMethods,
                                                    ];
                                                    updatedMethods[
                                                        index
                                                    ].active = true;
                                                    setPaymentMethods(
                                                        updatedMethods,
                                                    );
                                                    setSelectedPaymentMethods(
                                                        (prevValue) => {
                                                            const updatedPaymentMethods =
                                                                [...prevValue];
                                                            const isMethodExist =
                                                                updatedPaymentMethods.filter(
                                                                    (m) => {
                                                                        return (
                                                                            m.method ===
                                                                            method.method
                                                                        );
                                                                    },
                                                                );

                                                            if (
                                                                isMethodExist.length >
                                                                0
                                                            ) {
                                                                return updatedPaymentMethods;
                                                            } else {
                                                                return [
                                                                    ...updatedPaymentMethods,
                                                                    {
                                                                        method: method.method,
                                                                        amount: 0,
                                                                    },
                                                                ];
                                                            }
                                                        },
                                                    );
                                                }}
                                            >
                                                {method.method}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="payment-details">
                                    <div
                                        className="y_scrolling"
                                        style={{
                                            height: '300px',
                                            margin: '10px 0',
                                        }}
                                    >
                                        {selectedPaymentMethods?.map(
                                            (method, index) => (
                                                <div
                                                    key={index}
                                                    className="selected-method row mb-2 mx-0 my-1 border rounded p-2"
                                                >
                                                    <div className="col-8 p-0">
                                                        <i
                                                            className="material-icons-outlined btn-primary rounded-circle cp"
                                                            onClick={() => {
                                                                var mthd = null;
                                                                setSelectedPaymentMethods(
                                                                    selectedPaymentMethods.filter(
                                                                        (
                                                                            m,
                                                                            i,
                                                                        ) => {
                                                                            if (
                                                                                i !==
                                                                                index
                                                                            ) {
                                                                                return m;
                                                                            }
                                                                            mthd =
                                                                                m;
                                                                        },
                                                                    ),
                                                                );
                                                                const updatedMethods =
                                                                    [
                                                                        ...paymentMethods,
                                                                    ];
                                                                updatedMethods =
                                                                    updatedMethods.map(
                                                                        (m) => {
                                                                            if (
                                                                                m.method ===
                                                                                mthd.method
                                                                            ) {
                                                                                m.active = false;
                                                                            }
                                                                        },
                                                                    );

                                                                setPaymentMethods(
                                                                    updatedMethods,
                                                                );
                                                            }}
                                                        >
                                                            X
                                                        </i>
                                                        <span className="method-name">
                                                            {method.method}
                                                        </span>
                                                    </div>
                                                    <div className="col-4 p-0">
                                                        <input
                                                            type="number"
                                                            value={
                                                                method.amount
                                                            }
                                                            className="custom-input w-100 text-end"
                                                            onChange={(e) => {
                                                                setSelectedPaymentMethods(
                                                                    selectedPaymentMethods.map(
                                                                        (
                                                                            m,
                                                                            i,
                                                                        ) => {
                                                                            if (
                                                                                i ===
                                                                                index
                                                                            ) {
                                                                                return {
                                                                                    ...m,
                                                                                    amount: e
                                                                                        .target
                                                                                        .value,
                                                                                };
                                                                            }
                                                                            return m;
                                                                        },
                                                                    ),
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>

                                    <div className="amount-summary">
                                        <div className="row total-amount m-0">
                                            <div className="col-8 p-0">
                                                <span>Total Amount</span>
                                            </div>
                                            <div className="col-4 p-0 text-end">
                                                <span>₹{totalAmount}</span>
                                            </div>
                                        </div>
                                        <div className="due-amount">
                                            <span>Due Amount</span>
                                            <span>₹{dueAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => {
                                    setPmtDtls(null);
                                    setOpen(false);
                                }}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        payment_json: pmtDtls,
                                    });
                                    setOpen(false);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default PaymentMdl;
