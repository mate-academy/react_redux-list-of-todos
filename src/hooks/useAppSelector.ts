import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
