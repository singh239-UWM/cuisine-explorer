import IndexNav from '../../components/IndexNav';
import { Grid, Center, Autocomplete, ActionIcon, Text, Image, Card, Badge, Group, Button, TextInput } from '@mantine/core';
import { useInputState, useDebouncedValue } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function Countries({ data }) {
    const [search, setSearch] = useInputState("");
    //const [debounced] = useDebouncedValue(search, 1000, { leading: true });

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
                    Explore Countries
                </Text>
            </Center>
            <Center>
                <Autocomplete
                    placeholder="Country"
                    label=" "
                    radius="lg"
                    size="lg"
                    value={search}
                    onChange={setSearch}
                    // rightSection={<ActionIcon size="xl" >
                    //     {/* <Search /> */}
                    //     d
                    // </ActionIcon>}
                    sx={{
                        maxWidth: '800px',
                        width: '50vw',
                        minWidth: '650px'
                    }}
                    data={data.map((c) => c.country)}
                />
            </Center>
            <Grid justify={"center"} style={{ margin: '0' }}>
                {data.map((c, i) => {
                    return <>
                        {c.country.toLowerCase().match(search.toLocaleLowerCase()) ?
                            <>
                                <Grid.Col span={5} style={{ maxWidth: '350px', maxHeight: '300px' }}>
                                    <div style={{ width: 330, margin: 'auto' }}>
                                        <Card shadow="sm" p="lg">
                                            <Card.Section>
                                                <Image src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80" height={160} alt="Norway" />
                                            </Card.Section>
                                            <Group position="apart" style={{ marginBottom: 5, marginTop: 2 }}>
                                                <Text weight={500}>{c.country}</Text>
                                                <Badge color="green" variant="light">{c.region}</Badge>
                                            </Group>
                                            <Button key={i} variant="light" color="orange" fullWidth style={{ marginTop: 14 }} onClick={() => Router.push("/countries/" + c.country)}>
                                                Explore {c.country}'s Cousine
                                            </Button>
                                        </Card>
                                    </div>
                                </Grid.Col>
                            </> :
                            <>
                            </>}
                    </>
                }
                )}
            </Grid>
        </>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/countries`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}
