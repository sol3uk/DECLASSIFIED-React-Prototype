import { Box, Chip, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { Faction, IntelType, Season } from '../../data/intel';
import { CustomIntelFilterCheckbox } from '../CustomIntelFilterCheckbox';
import { getStyles, MenuProps, StyledIntelFilterMenu } from './styles';

interface FilterState {
  searchText: string;
  seasons: Season[];
  factions: Faction[];
  intelTypes: IntelType[];
}

export const IntelFilterMenu = () => {
  const theme = useTheme();
  const [season, setSeason] = useState<string[]>([]);
  const [faction, setFaction] = useState<string[]>([]);
  const [filterState, setFilterState] = useState<FilterState>({
    searchText: '',
    seasons: [],
    factions: [],
    intelTypes: []
  });

  const handleSeasonChange = (event: SelectChangeEvent<typeof season>) => {
    const {
      target: { value },
    } = event;
    setSeason(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleFactionChange = (event: SelectChangeEvent<typeof season>) => {
    const {
      target: { value },
    } = event;
    setFaction(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleSubmit = (values) => {
    console.info(JSON.stringify(values, null, 2));
  }

  const handleChange = (e) => {
    console.log({ e });

  }
  const seasons = Object.values(Season);
  const factions = Object.values(Faction);
  const intelTypes = Object.keys(IntelType);

  return (
    <StyledIntelFilterMenu>
      {/* CHANGE Formik TO THIS: https://react-hook-form.com/get-started */}
      <Formik
        initialValues={filterState}
        onSubmit={handleSubmit}
        onChange={handleChange}>
        <>
          <div>
            <InputLabel id="season-filter-label">Seasons</InputLabel>
            <Select
              name="seasons"
              label="Seasons"
              labelId="season-filter-label"
              id="season-filter"
              multiple
              value={season}
              onChange={handleSeasonChange}
              input={<OutlinedInput id="select-season-filter" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {seasons.map((seasonItem) => (
                <MenuItem
                  key={seasonItem}
                  value={seasonItem}
                  style={getStyles(seasonItem, season, theme)}
                >
                  {seasonItem}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div>
            <InputLabel id="faction-filter-label">Factions</InputLabel>
            <Select
              name="factions"
              label="Factions But longer and lets see if it changes"
              labelId="faction-filter-label"
              id="faction-filter"
              multiple
              value={faction}
              onChange={handleFactionChange}
              input={<OutlinedInput id="select-faction-filter" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {factions.map((factionItem) => (
                <MenuItem
                  key={factionItem}
                  value={factionItem}
                  style={getStyles(factionItem, faction, theme)}
                >
                  {factionItem}
                </MenuItem>
              ))}
            </Select>
          </div>
          {intelTypes.map((intelTypeItem) => (
            <CustomIntelFilterCheckbox
              key={intelTypeItem}
              name="intelTypes"
              intelType={intelTypeItem}
            />
          ))}
        </>
      </Formik>
    </StyledIntelFilterMenu>
  )
}
