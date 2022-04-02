import IndexNav from '../../components/IndexNav';
import { Grid, Center, Autocomplete, Title, Text, Image, Card, Badge, Group, Button, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { firebaseGetCuisines } from '../../firebase/db';

export default function Countries({ country }) {
    const router = useRouter()
    const { id } = router.query
    const [q, setQ] = useState([])


  
    useEffect(() => {
        firebaseGetCuisines(id).then((resQ) => {
            setQ(resQ)
        })
    }, [])

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
                    {id}&apos;s Cuisines
                </Text>
            </Center>
            <Center m={10}>
                {q.map((c, i) => {
                   return <Grid id={c.id}>
                        <Grid.Col >
                            <div style={{ width: '70vw', minWidth: '420px', maxWidth: '900px', margin: '0'}}>
                                <Card shadow="sm" p="sm">
                                    <Grid>
                                        <Grid.Col span={5}>
                                            <Card.Section>
                                                <Image
                                                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                                    height={300} />
                                            </Card.Section>
                                        </Grid.Col>
                                        <Grid.Col span={7}>
                                            <Group style={{ marginBottom: 5, marginTop: 2 }}>
                                                <Title>{c.data.name}</Title>
                                            </Group>
                                            <Group position="apart">
                                                <Badge size="xl" color="green" variant="light">Time: {c.data.time}min</Badge>
                                                <Badge size="xl" color="yellow" variant="light">Yield: {c.data.yield} Servings</Badge>
                                            </Group>
                                            <ScrollArea style={{ height: 165 }} scrollbarSize={16}>
                                                {c.data.description}
                                            </ScrollArea>
                                            <Group position="apart">
                                                <Button variant="light" color="dark" style={{ marginTop: 14 }}>
                                                    Start Cooking
                                                </Button>
                                                <Button variant="light" color="indigo" style={{ marginTop: 14 }}
                                                    onClick={() => console.log(c.id)}
                                                >
                                                    Save
                                                </Button>
                                            </Group>
                                        </Grid.Col>
                                    </Grid>
                                </Card>
                            </div>
                        </Grid.Col>
                    </Grid>
                })}
                {/* <Grid>
                    <Grid.Col >
                        <div style={{ width: '70vw', minWidth: '420px', maxWidth: '900px', margin: '0', maxHeight: '100px' }}>
                            <Card shadow="sm" p="sm">
                                <Grid>
                                    <Grid.Col span={5}>
                                        <Card.Section>
                                            <Image
                                                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                                height={300} />

                                        </Card.Section>
                                    </Grid.Col>
                                    <Grid.Col span={7}>
                                        <Group style={{ marginBottom: 5, marginTop: 2 }}>
                                            <Title>Smosassdfsdfs sdfsdfsdf  sdfsdfsdfsdfsdfsdf</Title>
                                        </Group>
                                        <Group position="apart">
                                            <Badge size="xl" color="green" variant="light">Time: 30min</Badge>
                                            <Badge size="xl" color="yellow" variant="light">Yield: 5</Badge>
                                        </Group>
                                        <ScrollArea style={{ height: 165 }} scrollbarSize={16}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis nisl dui. Nullam luctus rutrum iaculis. Donec ornare nunc quis leo aliquet, ac dapibus nisl commodo. Morbi fringilla congue sapien quis pellentesque. Quisque efficitur turpis turpis, sed congue ex accumsan eu. Pellentesque ipsum massa, interdum quis vehicula eu, rutrum a lectus. Nullam non feugiat libero. In vulputate tellus non massa auctor, in placerat sapien fringilla. Nulla facilisi. Nunc in nisi a turpis tempus maximus eu quis velit. Integer est mauris, rhoncus ac elit quis, aliquet tincidunt risus.
                                        </ScrollArea>
                                        <Group position="apart">
                                            <Button variant="light" color="dark" style={{ marginTop: 14 }}>
                                                Start Cooking
                                            </Button>
                                            <Button variant="light" color="indigo" style={{ marginTop: 14 }}>
                                                Save
                                            </Button>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        </div>
                    </Grid.Col>
                </Grid> */}
            </Center>


        </>
    )
}


export async function getStaticProps({ params }) {
    const req = await fetch(`https://ruqx9dv2kg.execute-api.us-east-1.amazonaws.com/v1/countries?req=all_countries`)
    const country = await req.json()

    return {
        props: {
            country,
        },
    }
}
export async function getStaticPaths() {
    const req = await fetch(`https://ruqx9dv2kg.execute-api.us-east-1.amazonaws.com/v1/countries?req=all_countries`)
    const data = await req.json()
    // console.log(data)
    const paths = data.map(c => {
        return { params: { id: c.country } }
    })

    return {
        paths,
        fallback: false
    };
}
