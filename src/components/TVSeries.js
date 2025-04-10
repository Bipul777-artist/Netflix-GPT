import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackGround from "./VideoBackground";
const TVSeries = () => {

    const series = useSelector((store) => store.movies?.topRatedSeries);

    if (!series) return ;

    const MainMovie = series[10];
    console.log(MainMovie);
    const {overview, id , original_name} = MainMovie

    return (
        <div>
            <VideoTitle title={original_name} overview={overview} />
            <VideoBackGround movieId={id} />
        </div>
    )
};

export default TVSeries;