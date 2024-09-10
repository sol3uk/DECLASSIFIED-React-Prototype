import styled from '@emotion/styled';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Button, ButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { DeclassifiedContext } from '../../contexts/DeclassifiedContext/declassifiedContextProvider';

export const MultiSelectMenu = ({ multiSelectState, setMultiSelectState }) => {
    const { filteredIntelStore } = useContext(DeclassifiedContext);

    // Function to handle select/deselect all
    function handleSelectAll(event, selectAll: boolean): void {
        const intelToSelect = selectAll ? filteredIntelStore.map(intel => intel.id) : [];
        setMultiSelectState(intelToSelect);
    }

    // Determine the state of the checkbox based on selection
    const renderCheckBoxIcon = () => {
        if (multiSelectState.length === 0) {
            return (
                <Button
                    title="Select all"
                    onClick={(event) => handleSelectAll(event, true)}
                >
                    <CheckBoxOutlineBlankIcon htmlColor="var(--clr-blue)" />
                </Button>
            );
        } else if (multiSelectState.length !== filteredIntelStore.length) {
            return (
                <Button
                    title="Deselect all"
                    onClick={(event) => handleSelectAll(event, false)}
                >
                    <IndeterminateCheckBoxIcon htmlColor="var(--clr-blue)" />
                </Button>
            );
        } else {
            return (
                <Button
                    title="Deselect all"
                    onClick={(event) => handleSelectAll(event, false)}
                >
                    <CheckBoxIcon htmlColor="var(--clr-blue)" />
                </Button>
            );
        }
    };

    // Functionality for additional buttons
    const handleButtonAction = (actionType) => {
        console.log(`Button ${actionType} clicked!`);
        // Implement your additional button functionality here
    };

    return (
        <MultiSelectMenuContent>
            {/* Render the checkbox button */}
            {renderCheckBoxIcon()}

            {/* Render additional buttons next to the checkbox */}

            <ButtonGroup fullWidth variant="contained">
                <Button
                    title="DECLASSIFY"
                    onClick={() => handleButtonAction("Button 1")}
                >
                    DECLASSIFY ✅
                </Button>
                <Button
                    title="CLASSIFY"
                    onClick={() => handleButtonAction("Button 2")}
                >
                    CLASSIFY ❌
                </Button>
            </ButtonGroup>
        </MultiSelectMenuContent>
    );
};

const MultiSelectMenuContent = styled.div`
display: flex;
align-items: center;
gap: 10px;
padding: 10px 10px 0 10px;
button{
    text-wrap: nowrap;
}
`
