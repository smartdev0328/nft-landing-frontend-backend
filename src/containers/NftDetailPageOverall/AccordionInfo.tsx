import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { FC } from 'react';

export interface descProp {
  category: number;
}

function getPanel(cat: number) {
  switch (cat) {
    case 1:
      return (
        <Disclosure.Panel
          className="px-4 pt-4 pb-2 text-neutral-500 text-sm dark:text-neutral-400"
          as="p">
          An egg that belongs to Pigasus. Pigasi (plural), like bumblebees, defy all known laws
          of aviation with their tiny wings somehow keeping them afloat.
          <br />
          <br />
          Opportunistic omnivores, they hover from tree to tree, gorging on fruits until they become
          too heavy to fly and retire for the day. They are also quick to startle, and will flee
          instantly with voluminous propelling fart.
        </Disclosure.Panel>
      );
    case 2:
      return (
        <Disclosure.Panel
          className="px-4 pt-4 pb-2 text-neutral-500 text-sm dark:text-neutral-400"
          as="p">
          An egg that belongs to Nessie. Amphibious dragons with startling swimming speeds.
          <br />
          <br />
          They are territorial, lone hunters, and can somehow designate territory boundaries in the
          deep ocean alongside other Nessies.
          <br />
          <br />
          Against larger threats or schools of prey, they are also able to strategise and
          collaborate on the fly, signifying impressive degrees of intelligence. They are the
          unparalleled apex predators of the NEXUS sea.
          <br />
          <br />
          On land, however they are as docile as dogs! Perhaps their confidence in their lethality
          allows them to approach other species without fear.
        </Disclosure.Panel>
      );
    case 3:
      return (
        <Disclosure.Panel
          className="px-4 pt-4 pb-2 text-neutral-500 text-sm dark:text-neutral-400"
          as="p">
          An egg that belongs to Floomph. A round mammal with an impenetrable hide.
          <br />
          <br />
          Their bodies are pliable and elastic, able to retain almost 98% of kinetic energy,
          allowing them to squash and stretch limitlessly and bounce about ferociously. With a powerful
          enough launch, they can continue bouncing in a straight line at the speed of a car.
          <br />
          <br />
          They look cuddly, but they are most definitely not. At least, on first few meetings.
          They are very mindful of personal space and can be quite aggressive against new faces.
          They are also very protective of their pack.
        </Disclosure.Panel>
      );
    case 4:
      return (
        <Disclosure.Panel
          className="px-4 pt-4 pb-2 text-neutral-500 text-sm dark:text-neutral-400"
          as="p">
          An egg that belongs to Gagamaru. A playful ape-like species that hatch from eggs and live
          in trees.
          <br />
          <br />
          Weak while young, they continue to wear the bottom half of the egg shell to protect
          themselves from predators that attack from below. The egg peels off fully by the time they
          become adults, when they are able to protect themselves with their powerful arm strength.
          <br />
          <br />
          They form tight-knit family tribes and are often seen together. They have shown to have
          great intelligence, communication and problem-solving skills. They communicate in the form
          of facial expressions, gestures and various vocalisations.
        </Disclosure.Panel>
      );
    default:
      break;
  }
}

const AccordionInfo: FC<descProp> = ({ category }) => {
  return (
    <div className="w-full rounded-2xl">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>Descriptions</span>
              <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>
            {getPanel(category)}
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default AccordionInfo;
