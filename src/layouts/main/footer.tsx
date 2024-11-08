import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

// const LINKS = [
//   {
//     headline: 'Multisystem EG',
//     children: [
//       // { name: 'About us', href: paths.about },
//       // { name: 'Contact us', href: paths.contact },
//       // { name: 'FAQs', href: paths.faqs },
//     ],
//   },
//   {
//     headline: 'Legal',
//     children: [
//       // { name: 'Terms and Condition', href: '#' },
//       // { name: 'Privacy Policy', href: '#' },
//     ],
//   },
//   {
//     headline: 'Contact',
//     children: [{ name: 'info@multisystem-eg.com', href: '#' }],
//   },
// ];

// ----------------------------------------------------------------------

export default function Footer() {
  // const pathname = usePathname();

  // const homePage = pathname === '/';

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> made by
          <Link href="https://multisystem-eg.com/"> multisystem-eg.com </Link>
        </Typography>
      </Container>
    </Box>
  );

  // const mainFooter = (
  //   <Box
  //     component="footer"
  //     sx={{
  //       position: 'relative',
  //       bgcolor: 'background.default',
  //     }}
  //   >
  //     <Divider />

  //     <Container
  //       sx={{
  //         pt: 10,
  //         pb: 5,
  //         textAlign: { xs: 'center', md: 'unset' },
  //       }}
  //     >
  //       <Logo sx={{ mb: 3 }} />

  //       <Grid
  //         container
  //         justifyContent={{
  //           xs: 'center',
  //           md: 'space-between',
  //         }}
  //       >
  //         <Grid xs={8} md={3}>
  //           <Typography
  //             variant="body2"
  //             sx={{
  //               maxWidth: 270,
  //               mx: { xs: 'auto', md: 'unset' },
  //             }}
  //           >
  //             ecommerce platform, that meet the worldwide standard
  //           </Typography>

  //           <Stack
  //             direction="row"
  //             justifyContent={{ xs: 'center', md: 'flex-start' }}
  //             sx={{
  //               mt: 3,
  //               mb: { xs: 5, md: 0 },
  //             }}
  //           />
  //         </Grid>

  //         <Grid xs={12} md={6}>
  //           <Stack spacing={5} direction={{ xs: 'column', md: 'row' }}>
  //             {LINKS.map((list) => (
  //               <Stack
  //                 key={list.headline}
  //                 spacing={2}
  //                 alignItems={{ xs: 'center', md: 'flex-start' }}
  //                 sx={{ width: 1 }}
  //               >
  //                 <Typography component="div" variant="overline">
  //                   {list.headline}
  //                 </Typography>

  //                 {list.children.map((link) => (
  //                   <Link
  //                     key={link.name}
  //                     component={RouterLink}
  //                     href={link.href}
  //                     color="inherit"
  //                     variant="body2"
  //                   >
  //                     {link.name}
  //                   </Link>
  //                 ))}
  //               </Stack>
  //             ))}
  //           </Stack>
  //         </Grid>
  //       </Grid>

  //       <Typography variant="body2" sx={{ mt: 10 }}>
  //         © 2021. All rights reserved
  //       </Typography>
  //     </Container>
  //   </Box>
  // );

  return simpleFooter;
}
