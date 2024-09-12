import {Button, Grid2 as Grid, Link} from "@mui/material";
import {FC, useState} from "react";
import Logo from '../../assets/logo.png'

const MenuItems = [
  {
    label: 'Kaufen',
    href: '/#'
  },
  {
    label: 'Mieten',
    href: '/#'
  },
  {
    label: 'Inserat schalten',
    href: '/#'
  }
]

const Languages: string[] = ["EN", 'DE']

export const Header: FC = () => {
  const [language, setLanguage] = useState<string>(Languages[0])

  const handleLanguageChange = () => {
    setLanguage((prevLang) => {
      const currentIndex = Languages.indexOf(prevLang);
      const nextIndex = (currentIndex + 1) % Languages.length; // Циклическое переключение
      return Languages[nextIndex];
    });
  };


  return <Grid container spacing={2}>
    <Grid size={4}>
      <Link href={'/#'}><img src={Logo} alt="logo"/></Link>
    </Grid>
    <Grid size={8} display={'flex'} justifyContent={'end'} alignItems={"center"} gap={'24px'}>
      {
        MenuItems.map((item, index) => {
          return <Link key={index} href={item.href}>{item.label}</Link>
        })
      }
      <Button variant={'contained'}>Sign in</Button>
      <Link onClick={handleLanguageChange}>{language}</Link>
    </Grid>
  </Grid>
}
