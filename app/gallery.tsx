"use client";

import { ReactNode, useState } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaHeart,
  FaBowlFood,
} from "react-icons/fa6";

import Modal from "./modal";

import { Animal } from "./types/user";

type Props = {
  animals: Animal[]
}

type FieldProps = {
  value: string;
  children: ReactNode;
};

const FieldValues = ({ value, children }: React.PropsWithChildren<FieldProps>) => {
  return (
    <div className="field">
      {children}
      <div className="value">{value}</div>
    </div>
  )
}


const Gallery = ({ animals }: Props) => {
  const [animalsList, setanimalsList] = useState(animals);
  const [selectedUser, setSelectedUser] = useState<Animal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (id: string) => {
    const animal = animalsList.find((item) => item.id === id) || null;

    if (animal) {
      setSelectedUser(animal);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-gallery">
      <h1 className="heading">Animals</h1>
      <div className="items">
        {animalsList?.map((animal, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(animal.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={animal.animal}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{animal.animal}</div>
              <div className="company">{animal.habitat}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.animal}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.animal} ({selectedUser.scientific_name})
                  </div>
                  <FieldValues value={`${selectedUser.average_lifespan} years old`}>
                    <FaHeart className="icon" />
                  </FieldValues>
                  <FieldValues value={selectedUser.habitat}>
                    <FaLocationDot className="icon" />
                  </FieldValues>
                  <FieldValues value={selectedUser.diet}>
                    <FaBowlFood className="icon" />
                  </FieldValues>

                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
