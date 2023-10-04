import { AngloConcertinaCgWheatstoneFingerChart as FingerChart } from "@/components/AngloConcertinaCgWheatstoneFingerChart/AngloConcertinaCgWheatstoneFingerChart";

export const PageTest = () => {
  return (
    <div>
      <div style={{ width: "80vw", padding: 5 }}>
        <FingerChart buttonIndex={5} action={"pullBellowsButtonPress"} />
      </div>
    </div>
  );
};
