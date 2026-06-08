function Profile({ profile }) {
  if (!profile) {
    return <div className="card">Loading portfolio...</div>;
  }

  return (
    <div className="card profile-card">
      <h2>Welcome, {profile.name}</h2>
      <p>{profile.summary}</p>
      <div className="profile-meta">
        <span>{profile.role}</span>
        <span>{profile.email}</span>
      </div>
      <h3>Projects</h3>
      <ul>
        {profile.projects.map((project) => (
          <li key={project.title}>
            <strong>{project.title}</strong>: {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
