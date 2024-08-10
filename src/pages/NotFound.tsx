import { FC } from 'react';

import notFoundIcon from 'assets/icons/notFound.png';

const NotFound: FC = () => {
    return (
        <div className="notFound">
            <div className="notFound__content">
                <img src={notFoundIcon} alt="not found" />
                <h3>Not Found Page</h3>
            </div>
        </div>
    );
};

export default NotFound;
