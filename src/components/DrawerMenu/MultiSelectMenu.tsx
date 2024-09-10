import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { DeclassifiedContext } from '../../contexts/DeclassifiedContext/declassifiedContextProvider';


export const MultiSelectMenu = ({ multiSelectState, setMultiSelectState }) => {
    const { filteredIntelStore } = useContext(DeclassifiedContext);
    function handleSelectAll(event, selectAll: boolean): void {
        const intelToSelect: string[] = [];
        if (selectAll) {
            intelToSelect.push(...filteredIntelStore.map(intel => intel.id));
        }
        setMultiSelectState(intelToSelect);
    }
    // console.log("multiSelectState: ", multiSelectState);
    // console.log("setMultiSelectState: ", setMultiSelectState);
    // console.log("filteredIntelStore.length: ", filteredIntelStore.length);

    if (multiSelectState.length === 0) {
        return (
            <Button
                title="selected"
                onClick={(event) => handleSelectAll(event, true)}>
                <CheckBoxOutlineBlankIcon htmlColor="var(--clr-blue)" />
            </Button>
        )
    } else if (multiSelectState.length !== filteredIntelStore.length && multiSelectState.length > 0) {
        return (
            <Button
                title="selected"
                onClick={(event) => handleSelectAll(event, false)}>
                <IndeterminateCheckBoxIcon htmlColor="var(--clr-blue)" />
            </Button>
        )
    } else if (multiSelectState.length === filteredIntelStore.length) {
        return (
            <Button
                title="selected"
                onClick={(event) => handleSelectAll(event, false)}
            >
                <CheckBoxIcon htmlColor="var(--clr-blue)" />
            </Button>)
    }
    return (<></>);
}