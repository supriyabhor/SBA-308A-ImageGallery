
import { popularCatagory } from './api.js';

async function initialLoadPage()
{
  console.log("page loading....");

  const categories = await popularCatagory();
  console.log("Popular Categories :", categories);
}

initialLoadPage()