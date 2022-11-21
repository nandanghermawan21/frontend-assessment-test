import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../../styles/Planets.module.css';
import styled from 'styled-components';
import Image from 'next/image';
import { any } from 'cypress/types/bluebird';

const getPlanet = async (id: string) => {
  try {
    const res = await fetch(`https://swapi.dev/api/planets/` + id);
    const response = await res.json();
    return response;
  } catch (err) {
    throw err;
  }
};

const MainStyled = styled.main`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 0;
`;

const PlanetsDetail: NextPage = () => {
  const router = useRouter();
  const { name, location } = router.query;
  const query = router.query;
  const id = query.id;

  const [planet, setPlanet] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const loadPlanet = () => {
    if (id === undefined) {
      return;
    }
    setTimeout(() => {
      getPlanet(id!.toString())
        .then((res) => {
          setPlanet([res as never]);
          setHasMoreItems(false);
        })
        .catch((err) => {
          console.log(err);
          setHasMoreItems(false);
        });
    }, 1500);
  };

  const iitemDetail = (label: any, value: any) => {
    return (
      <div className={styles.row}>
        <p>
          <label>{label}</label>
        </p>
        &nbsp; &nbsp;
        <p>
          <label>{value}</label>
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="section">
        <MainStyled>
          <div className={styles.container}>
            <InfiniteScroll
              threshold={0}
              pageStart={0}
              loadMore={loadPlanet}
              hasMore={hasMoreItems}
              loader={
                <div key={0} className="text-center">
                  loading data ...
                </div>
              }
            >
              <div className={styles.grid}>
                {planet.map((planet: any, i) => (
                  <div key={i}>
                    <div className={styles.planet_detail}>
                      <h2>{planet.name}</h2>
                      {iitemDetail('Rotation Period', planet.rotation_period)}
                      {iitemDetail(
                        'Orbital Period',
                        Number(planet.orbital_period).toLocaleString()
                      )}
                      {iitemDetail('Diameter', Number(planet.diameter).toLocaleString())}
                      {iitemDetail('Climate', planet.climate)}
                      {iitemDetail('Gravity', planet.gravity)}
                      {iitemDetail('Terrain', planet.terrain)}
                      {iitemDetail('Surface Water', planet.surface_water)}
                      {iitemDetail('Population', Number(planet.population).toLocaleString())}
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </MainStyled>
      </div>
    </div>
  );
};

export default PlanetsDetail;
