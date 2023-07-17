import CustomPopover from '../CustomPopover';
import BathFilterOptions from './BathFilterOptions';

const BathFilter = ({onBathRangeChange, bathCountRange}) => {
    
    const { displayTxt } = bathCountRange;

    return(
        <CustomPopover filterName={displayTxt} popoverHeader='Bathrooms'>
            <BathFilterOptions onBathRangeChange={onBathRangeChange}
            bathCountRange={bathCountRange}/>
        </CustomPopover>
    )
};

export default BathFilter;