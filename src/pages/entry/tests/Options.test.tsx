import React from 'react'
import {render,screen} from '../../../test-utils/testing-library-utils'

import Options  from '../Options'
import { expect,test } from '@jest/globals'


test('displays image for each scoop option from server',async () => {

    render(<Options optionType='scoops'/>,{})

    //find the images

    const scoopImages =  await screen.findAllByRole('img',{name: /scoop$/i})
    expect(scoopImages).toHaveLength(2)

    // confirm alt text of images
    //@ts-ignore

    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual(['Chocolate scoop','Vanilla scoop'])

})

 test('Displays image for each toppings option from server', async () => {
    //return 3 toppings from server
    render(<Options optionType='toppings'/>,{})

    const images = await screen.findAllByRole('img',{name:/topping$/i})
    expect(images).toHaveLength(3)

    //check the actual alt for the images
    //@ts-ignore

    const imageTitles = images.map((img) => img.alt)
    expect(imageTitles).toStrictEqual([
        'Cherries topping',
        'M&Ms topping',
        'Hot fudge topping',
    ])

})