import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, BackHandler } from 'react-native';
import { Block, HeaderDashboard } from '../components';
import { colors, fonts } from '../constants';
import FAQitem from '../components/FAQitem';
import { AuthContext, LoadingContext } from '../context';
import { AnnouncementService } from '../services';

export default function FAQ({ navigation }) {
  // context
  const { user } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();

  // states
  const [annoucements, setAnnouncements] = useState([
    {
      description:
        "Morinaga BF Chil School is a nutritional Growing up Formula specifically developed by Morinaga Research Center Japan for school-going children aged 3 to 12 years to FILL THEIR NUTRTION GAP. Morinaga BF Chil School provides 31 nutrients and 200 calories per glass that help in growth and brain development and strengthen immunity.\n\nFor expert advice related to your kid's nutrition, dial our Morinaga Nutrition Helpline: 0800-NUTRI (68874).",
      heading: 'Q) What is Morinaga BF Chil School?',
      typeTable: false,
    },
    {
      description: 'Is it available worldwide. ',
      heading: 'Q) Is this available in Pakistan only?',
      typeTable: false,
    },
    // {
    //   description:
    //     'Yes, Morinaga BF Chil School can be given with milk. Add 3 scoops of Morinaga BF Chil School in a glass of milk. ',
    //   heading: 'Q) Can we mix it in milk?',
    //   typeTable: false,
    // },
    {
      description:
        'Height, weight, and BMI are from:\n' +
        '*WHO GROWTH STANDARDS \n' +
        'Calories requirement are from: \n' +
        '*Human energy requirements Report of a Joint FAO/WHO/UNU Expert Consultation Rome, 17–24 October 2001 \n' +
        'Food list for calories intake: \n' +
        '* Food Composition Table For Pakistan Revised 2001, Food & Agricultural Organization of United Nations and Ministry Of Planning Development & Reform, GOVERNMENT OF PAKISTAN, American Dietic association & America Diabetes Association, 2008 \n' +
        'Recommended Diet Plan: \n' +
        '*Pakistan Dietary Guidelines for Better Nutrition,',
      heading: 'Q) What is the source of these information in the app?',
      typeTable: false,
    },
    {
      description:
        'a. If a brief reply has to be given\n' +
        'Morinaga BF Chil School is an imported growing up formula especially developed for school going children aged 3 years and above to meet their increased mental and physical needs. BF Chil-School is available in two delicious flavors - Vanilla and Chocolate\n' +
        '\nb. If in detail \n' +
        'Morinaga BF Chil School is an Imported growing up formula especially developed for school going children aged 3 years and above to meet their increased mental and physical needs. It offers 1 calorie per ml (200 calories per glass). As children of this age group usually miss out the important nutrients or your child is a fussy eater then a growing up formula like BF Chil-School is specially developed to promote physical/mental growth. BF chil school also helps in meeting daily energy needs and filling up the nutritional gap. BF Chil-School offers prebiotics and Lactoferrin to strengthen the immunity. Morinaga BF Chil School is an ideal growing up formula for your little one. It promotes their growth and development and keeps them active all day. BF Chil-School is available in two delicious flavors - Vanilla and Chocolate. You will see visible difference in your child’s growth in just 8-12 weeks.',
      heading: 'Q) Which Morinaga product should I use for my child aged 5?',
      typeTable: false,
    },
    {
      isLink: true,
      description:
        'Facebook:\n https://www.facebook.com/morinagapakistan\n\n' +
        'Instagram:\n https://www.instagram.com/morinagapakistan\n\n' +
        'YouTube:\n https://www.youtube.com/@MorinagaPakistan\n',
      heading: 'Q) Digital presence of NutriCo Morinaga?',
      typeTable: false,
    },
    {
      description:
        'Note:\n' +
        'These are the MRP, retail price vary from store to store but store cannot charge more than MRP.',
      heading: 'Q) What are the prices:',
      typeTable: true,
      tableDataHeader: [
        {
          d1: 'Product',
          d2: '',
          d3: 'Pack (G)',
          d4: 'Retail Price(Rs.)',
        },
        {
          d1: 'BF-1 Infant',
          d2: 'Formula',
          d3: '400',
          d4: '2550',
        },
        {
          d1: 'BF-1 Infant',
          d2: 'Formula',
          d3: '900',
          d4: '5535',
        },
        {
          d1: 'BF-2 Follow-up',
          d2: 'Formula',
          d3: '400',
          d4: '2550',
        },
        {
          d1: 'BF-2 Follow-up',
          d2: 'Formula',
          d3: '900',
          d4: '5535',
        },
        {
          d1: 'BFGROW 3 – Soft Pack',
          d2: 'Formula',
          d3: '300g',
          d4: 1090,
        },
        {
          d1: 'BFGROW 3 – Soft Pack',
          d2: 'Formula',
          d3: '600g',
          d4: 2150,
        },
        {
          d1: 'BFGROW 3 – Soft Pack',
          d2: 'Formula',
          d3: '900g',
          d4: 3190,
        },
        {
          d1: 'BFGROW 3 – Tin Pack',
          d2: 'G-up Formula',
          d3: '400g',
          d4: 2550,
        },
        {
          d1: 'BFGROW 3 – Tin Pack',
          d2: 'G-up Formula',
          d3: '900g',
          d4: 5535,
        },
        {
          d1: 'BF Chil School – Soft Pack-Vanilla',
          d2: 'G-up Formula',
          d3: '300g',
          d4: 1090,
        },
        {
          d1: 'BF Chil School – Soft Pack-Vanilla',
          d2: 'G-up Formula',
          d3: '600g',
          d4: 2150,
        },
        {
          d1: 'BF Chil School – Soft Pack-Vanilla',
          d2: 'G-up Formula',
          d3: '900g',
          d4: 3190,
        },
        {
          d1: 'BF Chil School – Soft Pack-Chocolate',
          d2: 'G-up Formula',
          d3: '300g',
          d4: 1090,
        },
        {
          d1: 'BF Chil School – Soft Pack-Chocolate',
          d2: 'G-up Formula',
          d3: '600g',
          d4: 2150,
        },
        {
          d1: 'NL - 33 Lactose Free',
          d2: 'Formula',
          d3: '350',
          d4: 2660,
        },
        {
          d1: 'BF-P LBW',
          d2: 'Formula',
          d3: '400',
          d4: 2455,
        },
        {
          d1: '**BF-Mama Nutritional -New pack',
          d2: 'Supplement (Vanilla)',
          d3: '200',
          d4: 860,
        },
      ],
    },
    {
      description: '',
      heading:
        'Q) What is the scoop size of Morinaga BF-1, 2, GROW3, BF chil school and NL-33? ',
      typeTable: true,
      tableDataHeader: [
        {
          d1: 'BF-1',
          d2: 'BF-2',
          d3: 'BF-3',
          d4: 'Chil-School',
          d5: 'NL-33',
        },
        {
          d1: '4.3g',
          d2: '4.3g',
          d3: '5.6g',
          d4: '6.6g',
          d5: '4.3g',
        },
      ],
    },
  ]);

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, [user?.role, setLoading]);

  // useEffect(() => {
  //   const backAction = () => {
  //     {
  //       user?.role == 'promotor'
  //         ? navigation.navigate('SettingsPromotor')
  //         : navigation.navigate('Settings');
  //     }
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, [navigation]);

  const backAction = () => {
    {
      navigation.goBack();
      // user?.role == 'promotor'
      //   ? navigation.navigate('SettingsPromotor')
      //   : navigation.navigate('Settings');
    }
    return true;
  };

  return (
    <Block>
      <HeaderDashboard
        text={'FAQs'}
        style={{ marginRight: 0 }}
        style1={{ marginTop: 0 }}
        showIcon={true}
        showText={true}
        styleIcon={{ marginTop: 3 }}
        text1={'Fill the Nutrition Gap'}
        text2={'Heathly'}
        text3={'Hello, Promotors👋'}
        onBackPress={backAction}
        settingPress={backAction}
      />

      <Text style={{ ...styles.text3, ...fonts.annoucement }}>
        Frequently Asked Questions
      </Text>

      {annoucements?.map((item, index) => (
        <FAQitem
          key={index}
          item={item}
          onPress={() => navigation.navigate('FAQDetails', { item })}
        />
      ))}
    </Block>
  );
}

const styles = StyleSheet.create({
  text1: {
    color: colors.annoucement,
    marginTop: 24,
    marginHorizontal: 41,
    fontSize: 16,
    fontWeight: '400',
  },
  text3: {
    color: colors.annoucement,
    marginTop: 16,
    marginHorizontal: 41,
    marginBottom: 18,
  },
});
