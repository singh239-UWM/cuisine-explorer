import IndexNav from '../../components/IndexNav';
import { Grid, Center, Autocomplete, ActionIcon, Text, Image, } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function Countries({ country }) {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <IndexNav></IndexNav>
            <Center style={{ height: '90px' }}>
                <Text
                    style={{
                        color: 'white',
                        lineHeight: '2',
                        fontSize: '60px',
                        fontWeight: 'bold',
                    }}>
                    Explore {id}
                </Text>
            </Center>
        </>
    )
}

export async function getStaticPaths() {
    const req = await fetch(`http://localhost:3000/api/countries`)
    const data = await req.json()

    const paths = data.map(country => { 
        return { params: { id: country } }
    })

    return {
        paths,
        fallback: false
    };
}
