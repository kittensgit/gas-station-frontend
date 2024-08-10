import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
    const data = useAppSelector((state) => state.auth.data);

    if (data._id) {
        const { email, fullName, refuelingHistory, role, scores, _id } = data;
        return {
            isAuth: true,
            userId: _id,
            email,
            fullName,
            role,
            scores,
            refuelingHistory,
        };
    } else {
        return {
            isAuth: false,
            userId: '',
            email: '',
            fullName: '',
            role: '',
            scores: 0,
            refuelingHistory: [],
        };
    }
};
