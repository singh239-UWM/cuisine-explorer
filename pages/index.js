import IndexNav from '../components/IndexNav';
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { Grid, Center, Autocomplete, ActionIcon, Text, Image, } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';

export default function Home() {
  const matches = useMediaQuery('(min-width: 800px)');
  const [ssr, setSsr] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setSsr(true)
  }, []);

  return (
    <>
      <IndexNav></IndexNav>
      <Center>
        <Autocomplete
          placeholder="Explore"
          label=" "
          radius="lg"
          size="lg"
          rightSection={<ActionIcon size="xl" >
            <Search />
          </ActionIcon>}
          sx={{
            maxWidth: '800px',
            width: '50vw',
            minWidth: '650px'
          }}
          data={['React', 'Angular', 'Svelte', 'Vue', 'polite', 'rob', 'reckless', 'field', 'execute', 'stool', 'negotiation']}
        />
      </Center>

      <Center style={{ height: '90px' }}>
        <Text
          style={{
            color: 'white',
            lineHeight: '2',
            fontSize: '75px',
            fontWeight: 'bold',
          }}>
          EXPLORE
        </Text>
      </Center>

      <Center>
        <Grid justify={'center'} gutter="xl" style={{ margin: 0 }}>
          <Grid.Col span={5}>
            <Grid gutter="xl">
              <Grid.Col>
                <Image className={styles.imgEffect}
                  height={300}
                  src="static/flag_food_edited.jpg"
                />
              </Grid.Col>

              <Grid.Col>
                <Image className={styles.imgEffect}
                  height={300}
                  src="static/for_you.jpg"
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={5}>
            <Image className={styles.imgEffect}
              height={625}
              src="static\trending.jpg"
            />
          </Grid.Col>
        </Grid>
      </Center>
    </>
  )
}


