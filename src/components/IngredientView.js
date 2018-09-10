import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { ContentContainer, ContentItems, CustomButton } from '../styled'

const IngredientView = ({ id, count, name, price, incrementIngredient, decrementIngredient }) => {  
  return (
    <ContentContainer>
      <ContentItems>
        <CustomButton
          variant='fab'
          onClick={() => decrementIngredient(id)}
        >
          <DeleteIcon />
        </CustomButton>
        <p>{name}, price: ${price}, count: {count}</p>
        <CustomButton
          variant='fab'
          onClick={() => incrementIngredient(id)}
        >
          <AddIcon />
        </CustomButton>
      </ContentItems>
    </ContentContainer>
  )
}

export default IngredientView