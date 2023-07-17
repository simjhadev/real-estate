import CustomPopover from '../CustomPopover';
import BedFilterOptions from './BedFilterOptions';

const BedFilter = ({onBedRangeChange, bedCountRange}) => {
    
    const { displayTxt } = bedCountRange;

    return(
        <CustomPopover filterName={displayTxt} popoverHeader='Bedrooms'>
            <BedFilterOptions onBedRangeChange={onBedRangeChange}
            bedCountRange={bedCountRange}/>
        </CustomPopover>
    )
};

export default BedFilter;