import IndexNav from '../components/IndexNav';
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { Grid, Center, Autocomplete, ActionIcon, Text, Image, LoadingOverlay} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';

export default function Home() {
  const matches = useMediaQuery('(min-width: 800px)');
  const [ssr, setSsr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSsr(true)
  }, []);

  const handleExploreCountries = () => {
    setLoading(true)
    Router.push("/countries")
  }

  return (
    <>
      <IndexNav></IndexNav>

      <Center style={{ height: '90px' }}>
        <Text
          style={{
            color: 'white',
            lineHeight: '2',
            fontSize: '75px',
            fontWeight: 'bold',
            marginTop: '15px'
          }}>
          EXPLORE
        </Text>
      </Center>

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
            minWidth: '650px',
            marginBottom: '15px',
            color: 'white'
          }}
          styles={{ input: { backgroundColor: "#3B393A", color: "white" } }}
          data={[]}
        />
      </Center>

      {loading ? (
        <LoadingOverlay overlayColor='#3B393A' visible={loading} />
      ) : (
        <Center>
          <Grid justify={'center'} gutter="xl" style={{ margin: 0 }}>
            <Grid.Col span={5}>
              <Grid gutter="xl">
                <Grid.Col>
                  <Image className={styles.imgEffect}
                    height={300}
                    src="static/flag_food_edited.jpg"
                    onClick={handleExploreCountries}
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
      )}
    </>
  )
}


