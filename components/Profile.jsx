import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
      <section className="w-full">
        <h1 className="head_text text-left">
          <span className="orange_gradient">{name} Profile</span>
        </h1>
        <p className="desc text-left">{desc}</p>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-10 mb-16'>
          {data.map((post)=> (
        <PromptCard 
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
        ))}
        </div>
      </section>
  )
}

export default Profile
