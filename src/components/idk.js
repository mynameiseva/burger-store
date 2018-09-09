import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { ContentContainer, ContentItems, CustomButton } from '../styled'

const idk = ({ ingredient, amount, name, createIngredient, deleteIngredient }) => {
  return (
    <ContentContainer>
      <ContentItems>
        <CustomButton
          variant='fab'
          onClick={() => deleteIngredient(ingredient, amount)}>
          <DeleteIcon />
        </CustomButton>
        <p>{name}</p>
        <CustomButton
          variant='fab'
          onClick={() => createIngredient(ingredient, amount)}>
          <AddIcon />
        </CustomButton>
      </ContentItems>
    </ContentContainer>
  )
}

export default idk