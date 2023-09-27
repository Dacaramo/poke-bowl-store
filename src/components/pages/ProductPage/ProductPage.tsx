import { FC, useId, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';

import {
  GREEN_500,
  LIME_400,
  ORANGE_500,
  RED_600,
  YELLOW_400,
} from '../../../constants/colors';
import { Item } from '../../../model/Item';
import { Pokemon } from '../../../model/Pokemon';
import { Product, ProductType } from '../../../model/Product';
import {
  determinePokemonTypeColor,
  determineProductType,
} from '../../../utils/modelUtils';
import { toPriceString } from '../../../utils/stringUtils';
import { useStore } from '../../../zustand/store';
import ImageCarrousel from '../../ImageCarrousel/ImageCarrousel';
import Select from '../../Select/Select';

interface Props {}

const ProductPage: FC<Props> = () => {
  const [quantity, setQuantity] = useState<string>('1');

  const location = useLocation();
  const navigate = useNavigate();
  const evolutionStepId = useId();
  const evolutionId = useId();
  const [cartProducts, addToCart] = useStore((state) => {
    return [state.cartProducts, state.addToCart];
  });

  const state = location.state as {
    product: Product;
    productType: ProductType;
    evolutionMap?: Record<string, Pokemon>;
  };
  const textClasses = 'font-nunito text-zinc-950';
  const h2Classes = `${textClasses} text-2xl font-bold`;
  const pClasses = `${textClasses} text-lg`;
  const liClasses = `${pClasses} list-disc`;
  const buttonClasses =
    'px-2 py-1 text-xl font-nunito font-bold bg-zinc-100 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-lg';
  const sectionClasses =
    'sm:flex-1 sm:w-auto w-full px-4 py-3 flex flex-col gap-2 bg-zinc-50 rounded-lg';
  const progressLineWidth = 3;
  const captureProbabilityPercentage = (state.product as Pokemon).captureRate
    ? ((state.product as Pokemon).captureRate! * 100) / 255
    : undefined;
  let captureProbabilityText = 'Unknown data';
  if (captureProbabilityPercentage) {
    if (
      captureProbabilityPercentage >= 0 &&
      captureProbabilityPercentage <= 20
    ) {
      captureProbabilityText = 'Really difficult';
    } else if (
      captureProbabilityPercentage >= 21 &&
      captureProbabilityPercentage <= 40
    ) {
      captureProbabilityText = 'Difficult';
    } else if (
      captureProbabilityPercentage >= 41 &&
      captureProbabilityPercentage <= 60
    ) {
      captureProbabilityText = 'Normal';
    } else if (
      captureProbabilityPercentage >= 61 &&
      captureProbabilityPercentage <= 80
    ) {
      captureProbabilityText = 'Easy';
    } else if (
      captureProbabilityPercentage >= 81 &&
      captureProbabilityPercentage <= 100
    ) {
      captureProbabilityText = 'Really easy';
    }
  }
  let captureProbabilityColor = '';
  if (captureProbabilityText === 'Really difficult') {
    captureProbabilityColor = RED_600;
  } else if (captureProbabilityText === 'Difficult') {
    captureProbabilityColor = ORANGE_500;
  } else if (captureProbabilityText === 'Normal') {
    captureProbabilityColor = YELLOW_400;
  } else if (captureProbabilityText === 'Easy') {
    captureProbabilityColor = LIME_400;
  } else if (captureProbabilityText === 'Really easy') {
    captureProbabilityColor = GREEN_500;
  }
  const baseHappinessPercentage = (state.product as Pokemon).baseHappiness
    ? ((state.product as Pokemon).baseHappiness! * 100) / 255
    : undefined;
  let baseHappinessText = 'Unknown data';
  let baseHappinessDescription = '';
  if (baseHappinessPercentage) {
    if (baseHappinessPercentage >= 0 && baseHappinessPercentage <= 30) {
      baseHappinessText = 'Low ☹️';
      baseHappinessDescription = `When found in nature ${
        (state.product as Pokemon).name
      } is an unhappy pokemon`;
    } else if (baseHappinessPercentage >= 31 && baseHappinessPercentage <= 60) {
      baseHappinessText = 'Medium 😐';
      baseHappinessDescription = `When found in nature ${
        (state.product as Pokemon).name
      } is a serious pokemon`;
    } else if (
      baseHappinessPercentage >= 61 &&
      baseHappinessPercentage <= 100
    ) {
      baseHappinessText = 'High 😁';
      baseHappinessDescription = `When found in nature ${
        (state.product as Pokemon).name
      } is a happy pokemon`;
    }
  }
  const isAlreadyInCart = cartProducts
    .map((val) => val.product.name)
    .includes(state.product.name);

  const handleClickOnEvolutionPokemon = (clickedPokemon: Pokemon) => {
    navigate(`/poke-bowl-store/product/${clickedPokemon.name}`, {
      state: {
        product: clickedPokemon,
        productType: determineProductType(clickedPokemon),
        evolutionMap: state.evolutionMap,
      },
    });
  };

  return (
    <div className='flex flex-col items-center sm:flex-row gap-2 sm:gap-[50px] justify-start items-start'>
      <h1 className='self-center text-3xl sm:text-5xl sm:hidden font-nunito font-bold'>
        {state.product.name}
      </h1>
      <div className='w-[30%] min-w-[250px] sm:self-start'>
        <ImageCarrousel
          size='lg'
          imageUrls={state.product.sprites}
          productType={determineProductType(state.product)}
        />
      </div>
      <div className='self-start flex-1 flex flex-col gap-2'>
        <h1 className='text-5xl hidden sm:block font-nunito font-bold'>
          {state.product.name}
        </h1>
        <p className={'text-xl font-nunito text-zinc-950'}>
          {state.product.price && (
            <span className='text-lg font-nunito text-zinc-950'>US$</span>
          )}
          <b className='ml-1'>{`${
            state.product.price
              ? toPriceString(state.product.price)
              : 'Not for sale'
          }`}</b>
        </p>
        {state.product.price !== undefined && !isAlreadyInCart && (
          <form className='flex flex-row gap-2 items-stretch'>
            <Select
              width='sm'
              id='quantity'
              label='Quantity'
              isLabelHidden
              isNoneOptionAllowed={false}
              options={['1', '2', '3', '4', '5']}
              value={quantity}
              onChange={(value) => setQuantity(value)}
            />
            <button
              className={buttonClasses}
              type='button'
              onClick={() => addToCart(state.product, parseInt(quantity))}
            >
              Add to cart
            </button>
          </form>
        )}
        {isAlreadyInCart && (
          <p className={'text-xl font-nunito font-bold text-zinc-950'}>
            Already in cart
          </p>
        )}
        <div className='flex flex-row flex-wrap justify-start gap-2'>
          {state.productType === 'pokemon' && (
            <>
              <section className={`sm:max-w-[125px] ${sectionClasses}`}>
                <h2 className={h2Classes}>Types</h2>
                {(state.product as Pokemon).types.map((type) => {
                  return (
                    <div
                      key={type}
                      style={{
                        backgroundColor: determinePokemonTypeColor(type),
                      }}
                      className='px-2 py-1 flex justify-center items-center text-xs text-zinc-50 font-nunito font-bold rounded-lg'
                    >
                      {type.toUpperCase()}
                    </div>
                  );
                })}
              </section>
              <section className={`sm:max-w-[125px] ${sectionClasses}`}>
                <h2 className={h2Classes}>Rarity</h2>
                <div className='px-2 py-1 flex justify-center items-center text-xs text-zinc-950 font-nunito font-bold rounded-lg border border-zinc-950'>
                  {(state.product as Pokemon).rarity.toUpperCase()}
                </div>
              </section>
              <section className={`sm:max-w-[175px] ${sectionClasses}`}>
                <h2 className={h2Classes}>Appearance</h2>
                <p className={pClasses}>
                  <b>Shape:</b>{' '}
                  {(state.product as Pokemon).shape || 'Unknown data'}
                </p>
                <p className={pClasses}>
                  <b>Color:</b>{' '}
                  {(state.product as Pokemon).color || 'Unknown data'}
                </p>
                <p className={pClasses}>
                  <b>Weight:</b> {(state.product as Pokemon).weight}kg
                </p>
                <p className={pClasses}>
                  <b>Height:</b> {(state.product as Pokemon).height}cm
                </p>
              </section>
              <section className={`sm:max-w-[175px] ${sectionClasses}`}>
                <h2 className={h2Classes}>Origin</h2>
                <p className={pClasses}>
                  <b>Habitat: </b>{' '}
                  {(state.product as Pokemon).habitat || 'Unknown data'}
                </p>
                <p className={pClasses}>
                  <b>Generation: </b>{' '}
                  {(state.product as Pokemon).generation || 'Unknown data'}
                </p>
              </section>
              <section className={`sm:min-w-[300px] ${sectionClasses}`}>
                <h2 className={h2Classes}>Evolution chain 🧬</h2>
                {(state.product as Pokemon).hasBranchedEvolutions && (
                  <p className={pClasses}>
                    This pokemon has branched evolutions
                  </p>
                )}
                <div className='flex flex-row flex-wrap sm:flex-nowrap gap-2 justify-center items-start'>
                  {(state.product as Pokemon).evolutions.map(
                    (evolutionStep, i) => {
                      return (
                        <div
                          key={evolutionStepId}
                          className='flex flex-col gap-2 justify-between items-center'
                        >
                          <p
                            className={`w-[100%] ${pClasses} font-bold border-b border-zinc-300 text-center`}
                          >
                            Step {i + 1}
                          </p>
                          {evolutionStep.map((evolution) => {
                            return (
                              <div
                                key={evolutionId}
                                className='flex flex-col cursor-pointer items-center'
                                onClick={() =>
                                  handleClickOnEvolutionPokemon(
                                    state.evolutionMap![evolution]
                                  )
                                }
                              >
                                <div className='w-[90px] h-[90px] overflow-hidden bg-zinc-300 rounded-full flex justify-center items-center'>
                                  <img
                                    className='w-[80%] h-[80%] font-nunito text-center object-contain'
                                    src={
                                      state.evolutionMap![evolution].sprites[0]
                                    }
                                    alt={`${evolution} image`}
                                  />
                                </div>
                                <p className='px-2 py-1 text-zinc-950 text-center font-nunito font-light'>
                                  {evolution}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  )}
                </div>
              </section>
              <section className={`sm:max-w-[300px] ${sectionClasses}`}>
                <h2 className={h2Classes}>Capture probability</h2>
                <div className='self-center w-[250px] flex flex-col gap-2'>
                  {captureProbabilityText === 'Unknown data' ? (
                    <p className={pClasses}>{captureProbabilityText}</p>
                  ) : (
                    <>
                      <p className='text-lg font-nunito'>
                        <b>{captureProbabilityText}</b>
                        {` (${
                          captureProbabilityPercentage
                            ? `${Math.round(captureProbabilityPercentage)}%`
                            : '?'
                        })`}
                      </p>
                      {captureProbabilityPercentage && (
                        <Line
                          percent={captureProbabilityPercentage}
                          strokeWidth={progressLineWidth}
                          trailWidth={progressLineWidth}
                          strokeColor={captureProbabilityColor}
                        />
                      )}
                    </>
                  )}
                </div>
              </section>
              <section className={`sm:max-w-[250px] ${sectionClasses}`}>
                <h2 className={h2Classes}>Base happiness</h2>
                <div className='w-[250px] flex flex-col gap-2'>
                  {baseHappinessText === 'Unknown data' ? (
                    <p className={pClasses}>{baseHappinessText}</p>
                  ) : (
                    <>
                      <p className='text-lg font-nunito'>
                        <b>{baseHappinessText}</b>
                        {` (${
                          baseHappinessPercentage
                            ? `${Math.round(baseHappinessPercentage)}%`
                            : '?'
                        })`}
                      </p>
                      <p className='text-lg font-nunito max-w-[225px]'>
                        {baseHappinessDescription}
                      </p>
                    </>
                  )}
                </div>
              </section>
              <section className={`sm:max-w-[300px] ${sectionClasses}`}>
                <h2 className={h2Classes}>Stats</h2>
                {(state.product as Pokemon).stats.length > 0 ? (
                  <>
                    {(state.product as Pokemon).stats.map((stat) => {
                      return (
                        <div
                          key={stat.name}
                          className='self-center w-[250px] flex flex-col gap-2'
                        >
                          <p className='text-lg font-nunito'>
                            <b>{stat.name}</b>
                            {` (${stat.baseValue} points)`}
                          </p>
                          <Line
                            percent={(stat.baseValue * 100) / 255}
                            strokeWidth={progressLineWidth}
                            trailWidth={progressLineWidth}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p className={pClasses}>Unknown data</p>
                )}
              </section>
              <section className={`max-w-[350px] ${sectionClasses}`}>
                <h2 className={h2Classes}>Notes</h2>
                <ul className={'self-center w-[200px] sm:w-[275px]'}>
                  <li className={liClasses}>
                    {(state.product as Pokemon).name} is a pokemon that{' '}
                    {(state.product as Pokemon).hasGenderDifferences
                      ? 'has'
                      : "doesn't have"}{' '}
                    gender differences.
                  </li>
                  <li className={liClasses}>
                    This pokemon grows {"it's"} level in a{' '}
                    {(state.product as Pokemon).growthRate?.toLowerCase()}{' '}
                    manner.
                  </li>
                  <li className={liClasses}>
                    If you defeat him on a battle you will obtain{' '}
                    {(state.product as Pokemon).baseExperience} points of
                    experience without including additional points gathered by
                    the level of the defeated {(state.product as Pokemon).name}{' '}
                    or held items.
                  </li>
                </ul>
              </section>
              <section className={sectionClasses}>
                <h2 className={h2Classes}>Games where it appears</h2>
                {(state.product as Pokemon).games.length > 0 ? (
                  <div className='flex flex-row flex-wrap gap-2'>
                    {(state.product as Pokemon).games.map((gameName) => {
                      return (
                        <p
                          key={gameName}
                          className='px-2 py-1 flex justify-center items-center text-xs text-zinc-950 font-nunito font-bold rounded-lg border border-zinc-950'
                        >
                          {gameName.toUpperCase()}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <p className={pClasses}>Unknown data</p>
                )}
              </section>
            </>
          )}
          {state.productType === 'item' && (
            <>
              <section className={sectionClasses}>
                <h2 className={h2Classes}>Effect</h2>
                <p className={pClasses}>
                  {(state.product as Item).effect || 'Unknown data'}
                </p>
              </section>
              <section className={sectionClasses}>
                <h2 className={h2Classes}>Category</h2>
                <p className={pClasses}>
                  {(state.product as Item).category || 'Unknown data'}
                </p>
              </section>
              <section className={sectionClasses}>
                <h2 className={h2Classes}>Attributes</h2>
                {(state.product as Item).attributes.length > 0 ? (
                  <ul className='flex flex-row flex-wrap gap-2'>
                    {(state.product as Item).attributes.map((attribute) => {
                      return (
                        <li
                          key={attribute}
                          className='px-2 py-1 flex justify-center items-center text-xs text-zinc-950 font-nunito font-bold rounded-lg border border-zinc-950'
                        >
                          {attribute.toUpperCase()}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className={pClasses}>Unknown data</p>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
