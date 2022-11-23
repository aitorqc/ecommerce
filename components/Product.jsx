import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

export default function Product({product:{ image, name, slug, price }}) {
    return (
        <div className='product-card'>
            <Link href={`/product/${slug.current}`}>
                <div>
                    <img src={urlFor(image && image[0])} alt="/"
                        width={250}
                        height={250}
                        className="product-image" />
                </div>
                <p className='product-name'>{name}</p>
                <p className='product-price'>${price}</p>
            </Link>
        </div>
    )
}
