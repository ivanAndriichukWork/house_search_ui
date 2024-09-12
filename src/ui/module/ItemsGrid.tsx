import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  Pagination,
  Typography
} from "@mui/material";
import {useHousesState} from "../../state/houses.ts";
import {HouseResponseDto} from "../../types";
import {useQueryInUrl} from "../../helpers";
import {useEffect, useState} from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export const ItemsGrid: React.FC = () => {
  const { houses, pagination } = useHousesState()
  const updateQueryParam = useQueryInUrl();

  const HandleChange = ( _event: React.ChangeEvent<unknown>, page: number ) => {
    updateQueryParam('page', page.toString());
  }

  return <Grid container spacing={4}>
    {houses.length > 0 && houses.map(( house, index ) =>
      <Grid key={index} size={4} display={'flex'}>
        {house && <HouseItem house={house}/>}
      </Grid>
    )}
    {houses.length > 0 && pagination.totalCount / 9 && <Grid size={12} display={'flex'} justifyContent={'center'}>
      <Pagination
        onChange={HandleChange}
        count={+Math.ceil(pagination.totalCount / 9)}
      />
    </Grid>}
  </Grid>
}


interface HouseItemProps {
  house: HouseResponseDto
}

const formatNumber = ( number: number ): string => {
  return new Intl.NumberFormat('de-DE', { style: 'decimal', minimumFractionDigits: 2 }).format(number);
};

const HouseItem = ( { house }: HouseItemProps ) => {
  const { images, location } = house

  const [imageExists, setImageExists] = useState<boolean | null>(null);
  const [liked, setLiked] = useState<boolean>(false);

  const img = images.length ? images[0].imageUrl : ''

  useEffect(() => {
    const isImg = new Image();
    isImg.src = img;

    isImg.onload = () => setImageExists(true);
    isImg.onerror = () => setImageExists(false);
  }, [img]);

  const handleLike = () => {
    setLiked(!liked);
  }


  return <Card sx={{ backgroundColor: '#F0F2F3', border: 'none', boxShadow: 'none', borderRadius: '12px' }}>

    <CardActionArea>
      <span style={{ position: "absolute", top: '19px', right: '6px', zIndex: 100 }}>
          <Button sx={{ width: 'min-content' }} onClick={handleLike}>
            {liked ? <FavoriteIcon color='secondary'/> : <FavoriteBorderIcon color='secondary' />}
          </Button>
      </span>
      {images.length > 0 ? <CardMedia
        component="img"
        height="240"
        image={imageExists ? images[0].imageUrl : 'https://via.placeholder.com/150'}
        alt={images[0].description}
      /> : <CardMedia
        component="img"
        height="240"
        image={'https://via.placeholder.com/150'}
        alt={'placeholder'}
      />
      }
      <CardContent>
        <Typography gutterBottom fontWeight={'bold'} variant="h6" mb={'12px'} textTransform={'uppercase'} lineHeight={1}
                    component="div"
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
          {house.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ID: {house.area * house.bedrooms + house.rooms} | {house.propertyType} | {location.postalCode} {location.city}
        </Typography>
        <Typography mb={'12px'} variant="body2" sx={{ color: 'text.secondary' }}>
          {house.rooms} Zimmer | {house.bedrooms} Bad | {house.area} m² | {house.livingType}
        </Typography>
        <Typography gutterBottom fontWeight={'500'} variant="h5" component="div">
          {formatNumber(house.price)}€
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
}
