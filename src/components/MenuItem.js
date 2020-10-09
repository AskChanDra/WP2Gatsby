// src/components/MenuItem.js
import React from 'react'
import { CreateLocalLink, UniveralLink } from "../helper"

const MenuItem = ({ menuItem, wordPressUrl }) => {
    return (
        <UniveralLink 
        style={{marginRight: '20px' }}
        to={CreateLocalLink(menuItem, wordPressUrl)}>
        {menuItem.label}
        </UniveralLink>
    )
}

export default MenuItem 