import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import TranslateIcon from '@material-ui/icons/Translate';
import { ExpandMore } from '@material-ui/icons';
import { langs } from '../../../i18next/i18next';
import { useTranslation } from 'react-i18next';

const SelectLanguage = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { t, i18n } = useTranslation();
    const [selectedLang, setselectedLang] = useState(i18n.language);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (lang) => {
        if (lang) {
            console.log(lang);
            i18n.changeLanguage(lang);
            setselectedLang(lang);
        }
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
                color='inherit'
                startIcon={<TranslateIcon />}
                endIcon={<ExpandMore />}
            >
                {selectedLang.toUpperCase()}
            </Button>
            <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleClose()}>
                {langs.map((lang) => (
                    <MenuItem key={lang} onClick={() => handleClose(lang)}>
                        {lang.toUpperCase()}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default SelectLanguage;
