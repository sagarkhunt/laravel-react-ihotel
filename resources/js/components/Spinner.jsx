import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Spinner() {
    return (
        <div
            className="auth-spin"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
            }}
        >
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />}
            />
        </div>
    );
}
