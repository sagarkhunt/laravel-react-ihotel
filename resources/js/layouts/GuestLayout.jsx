// import { useStateContext } from "../contexts/contextprovider";
import { Navigate, Outlet } from 'react-router-dom';

export default function GuestLayout() {
    // // const {token} = useStateContext();
    // const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    // console.log('🚀 ~ GuestLayout ~ isAuthenticated:', isAuthenticated);
    // if (!isAuthenticated) {
    //     return <Navigate to="/" />;
    // }

    return (
        <div>
            {/* <div>
            Layout
            </div> */}
            <Outlet />
        </div>
    );
}
