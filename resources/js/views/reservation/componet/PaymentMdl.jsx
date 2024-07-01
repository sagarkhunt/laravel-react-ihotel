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
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/Reservation/actions';

function PaymentMdl({ open, setOpen, setFormData, formData, totalAmount }) {
    const [pmtDtls, setPmtDtls] = useState(() =>
        structuredClone(formData?.payment_json || []),
    );
    const dispatch = useDispatch();
    const { payTypList } = useSelector((state) => state?.reserReducer);
    const [dueAmount, setDueAmount] = useState(0);

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState(
        formData?.payment_json ?? [],
    );

    useEffect(() => {
        const totalDueAmount = selectedPaymentMethods.reduce(
            (sum, method) => sum + parseFloat(method.amount || 0),
            0,
        );
        const dueAmt = parseFloat(totalAmount) - totalDueAmount;

        if (dueAmt < 0) {
            toast.error('Amount should not exceed total amount');
            setDueAmount(0);
        } else {
            setDueAmount(dueAmt);
        }
    }, [selectedPaymentMethods, totalAmount]);

    const handleMethodClick = (method) => {
        if (
            !selectedPaymentMethods.some((m) => m.method === method.rcpt_type)
        ) {
            setSelectedPaymentMethods([
                ...selectedPaymentMethods,
                { method: method.rcpt_type, amount: 0 },
            ]);
        }
    };

    const handleRemoveMethod = (index) => {
        setSelectedPaymentMethods(
            selectedPaymentMethods.filter((_, idx) => idx !== index),
        );
    };

    const handleAmountChange = (e, index) => {
        const updatedMethods = selectedPaymentMethods.map((m, idx) =>
            idx === index ? { ...m, amount: e.target.value } : m,
        );
        setSelectedPaymentMethods(updatedMethods);
    };

    const handleClose = () => {
        setPmtDtls(null);
        setOpen(false);
    };

    const handleSave = () => {
        setFormData({ ...formData, payment_json: selectedPaymentMethods });
        setOpen(false);
    };

    useEffect(() => {
        setPaymentMethods(payTypList);
    }, [payTypList]);

    useEffect(() => {
        dispatch({
            type: actions.PAY_TYP_LIST,
        });
    }, [dispatch]);

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
                    style={{ minWidth: '50%' }}
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
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={handleClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="receipt-collection-container">
                                <div className="payment-methods-sidebar">
                                    {Array.isArray(paymentMethods) &&
                                        paymentMethods.map((method, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`method-item ${selectedPaymentMethods.some((m) => m.method === method.rcpt_type) ? 'active' : ''}`}
                                                onClick={() =>
                                                    handleMethodClick(method)
                                                }
                                                disabled={selectedPaymentMethods.some(
                                                    (m) =>
                                                        m.method ===
                                                        method.rcpt_type,
                                                )}
                                            >
                                                {method.rcpt_type}
                                            </button>
                                        ))}
                                </div>
                                <div className="payment-details">
                                    <div
                                        className="y_scrolling"
                                        style={{
                                            height: '300px',
                                            margin: '10px 0',
                                        }}
                                    >
                                        {Array.isArray(
                                            selectedPaymentMethods,
                                        ) &&
                                            selectedPaymentMethods.map(
                                                (method, index) => (
                                                    <div
                                                        key={index}
                                                        className="selected-method row mb-2 mx-0 my-1 border rounded p-2"
                                                    >
                                                        <div className="col-8 p-0">
                                                            <i
                                                                className="material-icons-outlined btn-primary rounded-circle cp"
                                                                onClick={() =>
                                                                    handleRemoveMethod(
                                                                        index,
                                                                    )
                                                                }
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
                                                                onChange={(e) =>
                                                                    handleAmountChange(
                                                                        e,
                                                                        index,
                                                                    )
                                                                }
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
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSave}
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
