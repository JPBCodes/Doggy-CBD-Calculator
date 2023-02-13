import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { SetStateAction, useEffect, useRef, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const DROPS_PER_ML = 20;
  const LOW_DOSE_PER_10LB = 1;
  const MED_DOSE_PER_10LB = 3;
  const HIGH_DOSE_PER_10LB = 5;

  const [dogWeight, setDogWeight] = useState<number>(0);
  const [milliliters, setMilliliters] = useState<number>(0);
  const [milligrams, setMilligrams] = useState<number>(0);
  const [mgDosage, setMgDosage] = useState<number>(0);
  const [dropsPerDose, setDropsPerDose] = useState<number>(0);

  const numOfDrops = useRef<number>(0);
  const mgPerDrop = useRef<number>(0);

  useEffect(() => {
    numOfDrops.current = DROPS_PER_ML * milliliters;
  }, [milliliters]);

  useEffect(() => {
    mgPerDrop.current = milligrams / numOfDrops.current;
  }, [milligrams, milliliters]);

  useEffect(() => {
    setMgDosage((dogWeight / 10) * MED_DOSE_PER_10LB);
  }, [dogWeight]);

  useEffect(() => {
    setDropsPerDose(mgDosage / mgPerDrop.current);
  }, [mgDosage, milligrams, milliliters]);

  const handleDogWeightChange = (e: any) => {
    setDogWeight(e.target.value);
  };

  const handleMillilitersChange = (e: any) => {
    setMilliliters(e.target.value);
  };

  const handleMilligramsChange = (e: any) => {
    setMilligrams(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Dog CBD dosage Calculator</title>
        <meta
          name="description"
          content="CBD tincture dosage calculator for dogs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>CBD Tincture Dosage Calculator</h1>
        <form
          style={{ display: 'flex', flexDirection: 'column', fontSize: 26 }}>
          <div style={{ paddingBottom: '1vh' }}>
            <label htmlFor="dog-weight" style={{ paddingRight: '5.1vh' }}>
              Enter your dog&apos;s weight in lbs:
            </label>
            <input
              type="number"
              value={dogWeight}
              onChange={handleDogWeightChange}
              id="dog-weight"
              style={{
                fontSize: 16,
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ paddingBottom: '1vh' }}>
            <label htmlFor="milliliters" style={{ paddingRight: '4.1vh' }}>
              Enter your the bottle size in ml:
            </label>
            <input
              type="number"
              value={milliliters}
              onChange={handleMillilitersChange}
              id="milliliters"
              style={{
                fontSize: 16,
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ paddingBottom: '1vh' }}>
            <label htmlFor="milligrams" style={{ paddingRight: '3vh' }}>
              Enter the amount of CBD in mg:
            </label>
            <input
              type="number"
              value={milligrams}
              onChange={handleMilligramsChange}
              id="milligrams"
              style={{
                fontSize: 16,
                borderRadius: 4,
              }}
            />
          </div>
        </form>
        <h2>The dosage in mg is: {mgDosage}</h2>
        <h2>The amount of drops: {dropsPerDose}</h2>
      </main>
    </>
  );
}

