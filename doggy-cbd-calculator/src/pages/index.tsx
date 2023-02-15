import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useEffect, useRef, useState } from 'react';

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
  const [mgPerDrop, setMgPerDrop] = useState<number>(0);
  const [doseSelect, setDoseSelect] = useState<string>('medium');
  const [currentSelectedDose, setCurrentSelectedDose] =
    useState<number>(MED_DOSE_PER_10LB);

  const numOfDrops = useRef<number>(0);

  useEffect(() => {
    numOfDrops.current = DROPS_PER_ML * milliliters;
  }, [milliliters]);

  useEffect(() => {
    setMgPerDrop(milligrams / numOfDrops.current);
  }, [milligrams]);

  useEffect(() => {
    setMgDosage((dogWeight / 10) * currentSelectedDose);
  }, [dogWeight, currentSelectedDose]);

  // useEffect(() => {
  //   setDropsPerDose(mgDosage / mgPerDrop.current);
  // }, [mgDosage]);

  const handleDogWeightChange = (e: any) => {
    setDogWeight(e.target.value);
  };

  const handleMillilitersChange = (e: any) => {
    setMilliliters(e.target.value);
  };

  const handleMilligramsChange = (e: any) => {
    setMilligrams(e.target.value);
  };

  const calculateDosage = (e: any) => {
    e.preventDefault();
    setDropsPerDose(mgDosage / mgPerDrop);
  };

  const handleDoseSelectChange = (e: any) => {
    setDoseSelect(e.target.value);
    if (e.target.value === 'low') {
      setCurrentSelectedDose(LOW_DOSE_PER_10LB);
    } else if (e.target.value === 'medium') {
      setCurrentSelectedDose(MED_DOSE_PER_10LB);
    } else if (e.target.value === 'high') {
      setCurrentSelectedDose(HIGH_DOSE_PER_10LB);
    } else {
      setCurrentSelectedDose(MED_DOSE_PER_10LB);
    }
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
          style={{ display: 'flex', flexDirection: 'column', fontSize: 26 }}
          onSubmit={calculateDosage}>
          <div style={{ paddingBottom: '1vh' }}>
            <label htmlFor="dose-select" style={{ paddingRight: '17.3vh' }}>
              Select dosage level:
            </label>
            <select
              id="dose-select"
              value={doseSelect}
              onChange={handleDoseSelectChange}
              style={{
                fontSize: 16,
                borderRadius: 4,
              }}>
              <option value="low">Low Dose</option>
              <option value="medium">Medium Dose</option>
              <option value="high">High Dose</option>
            </select>
          </div>
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
          <button type="submit" id="submit">
            Calculate Dosage
          </button>
        </form>
        <h2>The dosage is: {Math.round(mgDosage / 0.5) * 0.5} mg</h2>
        {dropsPerDose ? (
          <div>
            <h2>CBD per drop: {mgPerDrop.toFixed(1)} mg</h2>
            <h2>The number of drops: {Math.round(dropsPerDose)}</h2>
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}

