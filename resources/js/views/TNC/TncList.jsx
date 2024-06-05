import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/TermConition/actions';
import AddTnc from './AddTnc';
import Spinner from '../../components/Spinner';
import EditTnc from './EditTnc';

function TncList() {
    const [listingData, setListingData] = useState([]);
    const [showTncPolicy, setShowTncPolicy] = useState('');
    const [tncPolicyHide, setTncPolicyHide] = useState(false);
    const [tncName, setTncName] = useState('');
    const [tncDetails, setTncDetails] = useState([]);
    const [tncId, setTncId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { loader, tncListData, tncCreated, tncUpdate, tncDelete } =
        useSelector((state) => state?.tncReducer);
    const hasItems = Array.isArray(listingData) && listingData.length > 0;
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            // If the search query is empty, restore the original listingData
            setListingData(tncListData);
        } else {
            // Otherwise, filter the tncListData based on the search query
            const filtered = tncListData.filter((item) =>
                item.tnc_details.toLowerCase().includes(query.toLowerCase()),
            );
            setListingData(filtered);
        }
    };

    const handleItemClick = (index, data) => {
        setSelectedIndex(index);
        setTncName(data?.tnc_name);
        setTncId(data?.id);
        const newArray = data?.tnc_details
            .split(',')
            .map((item) => item.trim());
        setTncDetails(newArray);
        setTncPolicyHide(true);
        setShowTncPolicy('edit');
    };
    const dispatch = useDispatch();
    const handleButtonClick = () => {
        setShowTncPolicy('add');
        setTncPolicyHide(true);
    };
    useEffect(() => {
        setListingData(tncListData);
    }, [tncListData]);
    useEffect(() => {
        dispatch({
            type: actions.TNC_LIST,
        });
    }, [tncCreated, tncUpdate, tncDelete]);
    return (
        <>
            <div className="container-fluid d-flex justify-content-between">
                <div
                    className="container-page p-3 policy-sidebar"
                    // style={{
                    //     width: '30%',
                    //     maxWidth: '380px',
                    //     minHeight: 'calc(100vh - 88px)',
                    // }}
                >
                    <div className="row">
                        <h6 className="headline-h6m mb-0">
                            Terms & Conditions
                        </h6>

                        <div className="col-12 d-flex justify-content-between gap-3 my-4">
                            <div
                                className="custom-input d-flex align-items-center py-0 w-100 gap-2 height-40"
                                // style={{ height: '40px' }}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.1296 11.8796H12.4712L12.2379 11.6546C13.0546 10.7046 13.5462 9.47122 13.5462 8.12956C13.5462 5.13789 11.1212 2.71289 8.12956 2.71289C5.13789 2.71289 2.71289 5.13789 2.71289 8.12956C2.71289 11.1212 5.13789 13.5462 8.12956 13.5462C9.47122 13.5462 10.7046 13.0546 11.6546 12.2379L11.8796 12.4712V13.1296L16.0462 17.2879L17.2879 16.0462L13.1296 11.8796ZM8.12956 11.8796C6.05456 11.8796 4.37956 10.2046 4.37956 8.12956C4.37956 6.05456 6.05456 4.37956 8.12956 4.37956C10.2046 4.37956 11.8796 6.05456 11.8796 8.12956C11.8796 10.2046 10.2046 11.8796 8.12956 11.8796Z"
                                        fill="#566B7D"
                                    />
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Search"
                                    style={{ border: 'none', outline: 'none' }}
                                    className="w-100"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div class="width-100">
                                <button
                                    type="button"
                                    className="btn btn-primary d-flex align-items-center gap-2"
                                    onClick={handleButtonClick}
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                                            fill="white"
                                        />
                                    </svg>
                                    <span> Term </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='sidebar-body'>
                        {loader ? (
                            <Spinner />
                        ) : hasItems ? (
                            <ul className="lists border-bottom">
                                {listingData.length > 0 ? (
                                    listingData.map((item, index) => (
                                        <li
                                            key={index}
                                            className={
                                                selectedIndex === index
                                                    ? 'selected_policy'
                                                    : ''
                                            }
                                            onClick={() =>
                                                handleItemClick(index, item)
                                            }
                                        >
                                            {item?.tnc_name}
                                        </li>
                                    ))
                                ) : (
                                    <li>No Tnc found</li>
                                )}
                            </ul>
                        ) : (
                            <p>No Tnc to display</p>
                        )}
                    </div>
                </div>

                <div class="policy-main-container">
                    {/* <!-- if no cancellation policy selected then this will appear --> */}
                    {!tncPolicyHide && (
                        <div
                            className="p-3 d-flex align-items-center justify-content-center policy-container-size"
                            // style={{ minHeight: 'calc(100vh - 88px)' }}
                        >
                            <div
                                className="d-flex flex-column gap-4 justify-content-center align-items-center container-page no-policy-selected-banner"
                                // style={{
                                //     borderRadius: '24px',
                                //     width: '450px',
                                //     height: '360px',
                                // }}
                            >
                                <svg
                                    width="222"
                                    height="216"
                                    viewBox="0 0 222 216"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_999_43991)">
                                        <path
                                            d="M141.376 48.077H81.5567C80.1935 48.0787 78.8866 48.6192 77.9227 49.58C76.9588 50.5408 76.4166 51.8434 76.4149 53.2022V185.722L75.7293 185.931L61.0547 190.41C60.3592 190.621 59.608 190.549 58.966 190.209C58.324 189.869 57.8436 189.288 57.6304 188.596L13.98 46.4745C13.7676 45.7813 13.84 45.0324 14.1813 44.3923C14.5226 43.7523 15.1049 43.2735 15.8002 43.0612L38.4138 36.1593L103.971 16.1574L126.585 9.25553C126.929 9.14996 127.291 9.11307 127.649 9.14697C128.008 9.18087 128.356 9.2849 128.674 9.4531C128.992 9.6213 129.274 9.85038 129.503 10.1272C129.732 10.404 129.904 10.7232 130.009 11.0664L141.167 47.3937L141.376 48.077Z"
                                            fill="#F2F2F2"
                                        />
                                        <path
                                            d="M154.429 47.3935L140.982 3.61087C140.758 2.88137 140.392 2.20296 139.906 1.61441C139.419 1.02586 138.82 0.53871 138.144 0.180787C137.469 -0.177135 136.729 -0.398814 135.967 -0.471574C135.205 -0.544334 134.436 -0.466749 133.705 -0.243261L101.911 9.45698L36.3572 29.4622L4.56385 39.1659C3.0869 39.618 1.85023 40.6357 1.12529 41.9956C0.400348 43.3556 0.24636 44.9467 0.697133 46.4197L46.6578 196.051C47.024 197.24 47.7628 198.281 48.766 199.02C49.7691 199.76 50.9837 200.16 52.2316 200.161C52.8091 200.162 53.3834 200.075 53.9351 199.905L75.7294 193.256L76.415 193.044V192.33L75.7294 192.538L53.7329 199.252C52.4292 199.649 51.0212 199.513 49.8175 198.876C48.6139 198.238 47.7131 197.151 47.3125 195.853L1.35542 46.2182C1.15698 45.5747 1.08782 44.8986 1.15189 44.2285C1.21597 43.5584 1.41202 42.9075 1.72883 42.3131C2.04563 41.7186 2.47698 41.1923 2.99815 40.7642C3.51932 40.3362 4.12008 40.0148 4.76603 39.8185L36.5593 30.1149L102.114 10.113L133.907 0.409351C134.397 0.260311 134.906 0.184318 135.419 0.183842C136.518 0.186303 137.588 0.539583 138.471 1.19194C139.354 1.84429 140.005 2.76144 140.327 3.80905L153.713 47.3935L153.926 48.0769H154.639L154.429 47.3935Z"
                                            fill="#3F3D56"
                                        />
                                        <path
                                            d="M42.4945 43.1732C41.8338 43.1727 41.1906 42.9612 40.6594 42.5697C40.1281 42.1782 39.7367 41.6273 39.5426 40.9978L35.1274 26.6228C35.0088 26.2366 34.9676 25.831 35.0063 25.429C35.0449 25.027 35.1626 24.6365 35.3527 24.2799C35.5428 23.9233 35.8015 23.6074 36.114 23.3505C36.4266 23.0935 36.7868 22.9004 37.1743 22.7822L97.4835 4.37817C98.2659 4.1402 99.111 4.22136 99.8334 4.60383C100.556 4.9863 101.096 5.63884 101.337 6.41822L105.752 20.7934C105.99 21.5732 105.909 22.4156 105.525 23.1356C105.142 23.8556 104.487 24.3945 103.705 24.6341L43.3958 43.0382C43.1037 43.1275 42.7999 43.173 42.4945 43.1732Z"
                                            fill="#0863B5"
                                        />
                                        <path
                                            d="M65.6233 14.8605C69.4096 14.8605 72.479 11.801 72.479 8.02692C72.479 4.25285 69.4096 1.19336 65.6233 1.19336C61.837 1.19336 58.7676 4.25285 58.7676 8.02692C58.7676 11.801 61.837 14.8605 65.6233 14.8605Z"
                                            fill="#0863B5"
                                        />
                                        <path
                                            d="M65.6235 12.3537C68.0211 12.3537 69.9647 10.4163 69.9647 8.02644C69.9647 5.63658 68.0211 3.69922 65.6235 3.69922C63.2259 3.69922 61.2822 5.63658 61.2822 8.02644C61.2822 10.4163 63.2259 12.3537 65.6235 12.3537Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M207.016 198.417H91.1549C90.3824 198.416 89.6418 198.11 89.0956 197.565C88.5494 197.021 88.2421 196.282 88.2412 195.512V57.1328C88.2421 56.3628 88.5493 55.6246 89.0956 55.0801C89.6418 54.5356 90.3824 54.2294 91.1549 54.2285H207.016C207.789 54.2294 208.529 54.5357 209.076 55.0801C209.622 55.6246 209.929 56.3628 209.93 57.1328V195.512C209.929 196.282 209.622 197.021 209.075 197.565C208.529 198.11 207.789 198.416 207.016 198.417Z"
                                            fill="#E6E6E6"
                                        />
                                        <path
                                            d="M153.713 47.3945H81.5568C80.012 47.3967 78.5311 48.0094 77.4387 49.0982C76.3463 50.1871 75.7317 51.6632 75.7295 53.2031V192.539L76.4151 192.331V53.2031C76.4167 51.8443 76.959 50.5416 77.9229 49.5808C78.8868 48.62 80.1937 48.0795 81.5568 48.0779H153.926L153.713 47.3945ZM216.614 47.3945H81.5568C80.012 47.3967 78.5311 48.0094 77.4387 49.0982C76.3463 50.1871 75.7317 51.6632 75.7295 53.2031V209.692C75.7317 211.231 76.3463 212.708 77.4387 213.796C78.5311 214.885 80.012 215.498 81.5568 215.5H216.614C218.159 215.498 219.64 214.885 220.732 213.796C221.825 212.708 222.439 211.231 222.441 209.692V53.2031C222.439 51.6632 221.825 50.1871 220.732 49.0982C219.64 48.0094 218.159 47.3967 216.614 47.3945ZM221.756 209.692C221.754 211.05 221.212 212.353 220.248 213.314C219.284 214.275 217.977 214.815 216.614 214.817H81.5568C80.1937 214.815 78.8868 214.275 77.9229 213.314C76.959 212.353 76.4167 211.05 76.4151 209.692V53.2031C76.4167 51.8443 76.959 50.5416 77.9229 49.5808C78.8868 48.62 80.1937 48.0795 81.5568 48.0779H216.614C217.977 48.0795 219.284 48.62 220.248 49.5808C221.212 50.5416 221.754 51.8443 221.756 53.2031V209.692Z"
                                            fill="#3F3D56"
                                        />
                                        <path
                                            d="M180.621 62.4282H117.549C116.731 62.4273 115.947 62.103 115.368 61.5265C114.79 60.95 114.465 60.1684 114.464 59.3531V44.3192C114.465 43.504 114.79 42.7223 115.368 42.1458C115.947 41.5693 116.731 41.2451 117.549 41.2441H180.621C181.439 41.2451 182.223 41.5693 182.802 42.1458C183.38 42.7223 183.706 43.504 183.706 44.3192V59.3531C183.706 60.1684 183.38 60.95 182.802 61.5265C182.223 62.103 181.439 62.4273 180.621 62.4282Z"
                                            fill="#0863B5"
                                        />
                                        <path
                                            d="M149.085 42.2687C152.871 42.2687 155.941 39.2092 155.941 35.4351C155.941 31.6611 152.871 28.6016 149.085 28.6016C145.299 28.6016 142.229 31.6611 142.229 35.4351C142.229 39.2092 145.299 42.2687 149.085 42.2687Z"
                                            fill="#0863B5"
                                        />
                                        <path
                                            d="M149.085 39.598C151.391 39.598 153.261 37.7345 153.261 35.4357C153.261 33.137 151.391 31.2734 149.085 31.2734C146.779 31.2734 144.909 33.137 144.909 35.4357C144.909 37.7345 146.779 39.598 149.085 39.598Z"
                                            fill="white"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_999_43991">
                                            <rect
                                                width="222"
                                                height="216"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <p
                                    className="subtitle-1m"
                                    style={{ color: '#566b7d' }}
                                >
                                    Please Select Terms & Conditions
                                </p>
                            </div>
                        </div>
                    )}

                    {/* <!-- Add More Policy  --> */}
                    {showTncPolicy === 'add' && (
                        <AddTnc
                            setTncPolicyHide={setTncPolicyHide}
                            setShowTncPolicy={setShowTncPolicy}
                        />
                    )}
                    {showTncPolicy === 'edit' && (
                        <EditTnc
                            setTncPolicyHide={setTncPolicyHide}
                            setShowTncPolicy={setShowTncPolicy}
                            tncName={tncName}
                            tncDetails={tncDetails}
                            tncId={tncId}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default TncList;
