import type { NextPage } from 'next';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../../styles/Planets.module.css';
import styled from 'styled-components';
import Image from 'next/image';

const getList = async (page: number) => {
  if (page > 2) {
    return null;
  } else {
    try {
      const res = await fetch(`https://swapi.dev/api/planets/?page=` + page);
      const response = await res.json();
      return response;
    } catch (err) {
      throw err;
    }
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

const Planets: NextPage = () => {
  const [planets, setPlanets] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const loadPlanets = (page: number) => {
    if (page > 2) {
      setHasMoreItems(false);
      return;
    }
    setTimeout(() => {
      getList(page)
        .then((res) => {
          const newList = planets.concat(res.results);
          setPlanets(newList);

          if (res.data.length === 0) {
            setHasMoreItems(false);
          } else {
            setHasMoreItems(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1500);
  };

  return (
    <div>
      <div className="section">
        <MainStyled>
          <div className={styles.container}>
            <InfiniteScroll
              threshold={0}
              pageStart={0}
              loadMore={loadPlanets}
              hasMore={hasMoreItems}
              loader={
                <div key={0} className="text-center">
                  loading data ...
                </div>
              }
            >
              <div className={styles.grid}>
                {planets.map((planet: any, i) => (
                  <a href={'planets/detail'} className="box m-3 user" key={i}>
                    <div className={styles.planet}>
                      <h2>{planet.name}</h2>
                      <div className={styles.row}>
                        <p>
                          <span className={styles.logo}>
                            <Image src="/rotation.png" alt="" width={12} height={12} />
                            &nbsp;
                            <label>{planet.rotation_period}</label>
                          </span>
                        </p>
                        &nbsp; &nbsp;
                        <p>
                          <span className={styles.logo}>
                            <label>{planet.orbital_period}</label>
                            &nbsp;
                            <Image src="/orbit.png" alt="" width={12} height={12} />
                          </span>
                        </p>
                      </div>
                      <div className={styles.row}>
                        <p>
                          <span className={styles.logo}>
                            <Image src="/diameter.png" alt="" width={12} height={12} />
                            &nbsp;
                            <label>{planet.diameter}</label>
                          </span>
                        </p>
                        &nbsp; &nbsp;
                        <p>
                          <span className={styles.logo}>
                            <label>{planet.population / 1000000} M</label>
                            &nbsp;
                            <Image src="/population.png" alt="" width={12} height={12} />
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </InfiniteScroll>
            {hasMoreItems ? '' : <div className="text-center">no data anymore ...</div>}
          </div>
        </MainStyled>
      </div>
    </div>
  );
};

export default Planets;
