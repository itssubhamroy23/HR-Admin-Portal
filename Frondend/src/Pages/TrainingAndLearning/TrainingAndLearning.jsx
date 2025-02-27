import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Inside your component
import {
    GraduationCap,
    Users,
    Calendar,
    Clock,
    Award,
    Plus,
    BookOpen,
    FileText,
    Video,
    Edit,
    Trash,
    Link as LinkIcon,
    MoreVertical,
    CheckCircle,
    AlertCircle,
    X
} from 'lucide-react';
import './TrainingAndLearning.css';

const TrainingAndLearning = () => {
    const [showAddTraining, setShowAddTraining] = useState(false);
    const [showEditTraining, setShowEditTraining] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [currentTraining, setCurrentTraining] = useState(null);

    const [summary, setSummary] = useState({
        activeTrainings: 0,
        completedTrainings: 0,
        totalParticipants: 0,
        upcomingSessions: 0,
    });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        trainerId: '',
        duration: 4,
        courseProgress: 0,
        certificationAvailable: false,
        totalParticipants: 0,
        upcomingSessions: 0,
        activeTraining: true,
        materialFiles: [],
        lectureFiles: [],
        resourceFiles: [],
        startDate: '',
        endDate: '',
    });
    const navigate = useNavigate();
    useEffect(() => {
        fetchTrainingData();
    }, []);

    const fetchTrainingData = async () => {
        try {
            const response = await fetch('http://localhost:5000/trainings/FormattedTrainings');
            if (!response.ok) throw new Error('Failed to fetch', response);
            const data = await response.json();
            console.log("this is trainings data ", data);
            setTrainings(data.trainings);
            setSummary(data.summary);
        } catch (error) {
            console.error('Error fetching training data:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
        }));
    };




    const handleSubmitTraining = async (e) => {
        e.preventDefault();

        try {
            console.log('This is the uploded data', formData)
            const response = await fetch('http://localhost:5000/trainings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create training');
            }

            // Reset form data
            resetFormData();

            // Close modal and refresh data
            setShowAddTraining(false);
            fetchTrainingData();
        } catch (error) {
            console.error('Error creating training:', error);
            alert(`Failed to create training: ${error.message}`);
        }
    };


    const handleUpdateTraining = async (e) => {
        e.preventDefault();

        try {
            console.log(currentTraining.id);
            const response = await fetch(`http://localhost:5000/trainings/${currentTraining.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log("ygvby");

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update training');
            }

            // Reset form data
            resetFormData();

            // Close modal and refresh data
            setShowEditTraining(false);
            setCurrentTraining(null);
            fetchTrainingData();
        } catch (error) {
            console.error('Error updating training:', error);
            alert(`Failed to update training: ${error.message}`);
        }
    };

    const handleDeleteTraining = async () => {
        try {
            const response = await fetch(`http://localhost:5000/trainings/${currentTraining.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete training');
            }

            // Close modal and refresh data
            setShowDeleteConfirm(false);
            setCurrentTraining(null);
            fetchTrainingData();
        } catch (error) {
            console.error('Error deleting training:', error);
            alert(`Failed to delete training: ${error.message}`);
        }
    };

    const openEditModal = (training) => {
        setCurrentTraining(training);
        setFormData({
            title: training.title,
            description: training.description,
            trainerId: training.trainer.id,
            duration: training.duration || 4,
            courseProgress: training.progress || 0,
            certificationAvailable: training.certificationAvailable || false,
            totalParticipants: training.participants?.length || 0,
            upcomingSessions: training.upcomingSessions || 0,
            activeTraining: training.status === 'In Progress'
        });
        setShowEditTraining(true);
    };

    const openDeleteConfirm = (training) => {
        setCurrentTraining(training);
        setShowDeleteConfirm(true);
    };

    const resetFormData = () => {
        setFormData({
            title: '',
            description: '',
            trainerId: '',
            duration: 4,
            courseProgress: 0,
            certificationAvailable: false,
            totalParticipants: 0,
            upcomingSessions: 0,
            activeTraining: true,
            materialFiles: [],
            lectureFiles: [],
            resourceFiles: [],
            startDate: "",
            endDate: ""

        });
    };

    const [selectedTraining, setSelectedTraining] = useState(null);
    const [showParticipants, setShowParticipants] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress':
                return 'status-in-progress';
            case 'Completed':
                return 'status-completed';
            case 'Upcoming':
                return 'status-upcoming';
            default:
                return 'status-default';
        }
    };

    const getResourceIcon = (type) => {
        switch (type) {
            case 'pdf':
                return <FileText className="icon" />;
            case 'video':
                return <Video className="icon" />;
            case 'link':
                return <LinkIcon className="icon" />;
            default:
                return null;
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFileChange = (event, type) => {
        setFormData(prevState => ({
            ...prevState,
            [type]: Array.from(event.target.files) // Convert FileList to an array
        }));
    };
    const handleUpload = async () => {
        const uploadData = new FormData();
        // console.log(formData);
        // Append text fields
        Object.keys(formData).forEach(key => {
            if (!["materialFiles", "lectureFiles", "resourceFiles"].includes(key)) {
                // console.log(key, formData[key]);
                uploadData.append(key, formData[key]);
            }
        }
        );
        console.log(formData.materialFiles);
        console.log(formData.lectureFiles);
        console.log(formData.resourceFiles);
        // Append file fields only if they exist
        if (formData.materialFiles?.length) {
            console.log("1111111");
            formData.materialFiles.forEach(file => uploadData.append("material", file));
        }
        if (formData.lectureFiles?.length) {
            console.log("1111112");
            formData.lectureFiles.forEach(file => uploadData.append("lecture", file));
        }
        if (formData.resourceFiles?.length) {
            console.log("1111113");
            formData.resourceFiles.forEach(file => uploadData.append("resource", file));
        }


        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: uploadData
            });

            const data = await response.json();
            console.log("Upload Success:", data);
        } catch (error) {
            console.error("Upload Error:", error);
        }
    }; return (
        <div className="training-container">
            <div className="header-section">
                <div className="header-title">
                    <div className="page-header">
                        <h2 className="page-title">Training & Learning</h2>
                        <p className="page-description">
                            Enhance skills and track learning progress with tailored training programs.
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setShowAddTraining(true)}
                    className="add-training-btn"
                >
                    <Plus className="button-icon" />
                    Add Training
                </button>
            </div>

            <div className="training-stats-grid">
                <div className="training-stat-card">
                    <div className="training-stat-content">
                        <div>
                            <p className="training-stat-label">Active Trainings</p>
                            <p className="training-stat-value">{summary.activeTrainings}</p>
                        </div>
                        <div className="training-icon-wrapper active-icon">
                            <BookOpen className="training-icon" />
                        </div>
                    </div>
                </div>

                <div className="training-stat-card">
                    <div className="training-stat-content">
                        <div>
                            <p className="training-stat-label">Completed Trainings</p>
                            <p className="training-stat-value">{summary.completedTrainings}</p>
                        </div>
                        <div className="training-icon-wrapper completed-icon">
                            <Award className="training-icon" />
                        </div>
                    </div>
                </div>

                {/* Total Participants Card */}
                <div className="training-stat-card">
                    <div className="training-stat-content">
                        <div>
                            <p className="training-stat-label">Total Participants</p>
                            <p className="training-stat-value">{summary.totalParticipants}</p>
                        </div>
                        <div className="training-icon-wrapper participants-icon">
                            <Users className="training-icon" />
                        </div>
                    </div>
                </div>

                <div className="training-stat-card">
                    <div className="training-stat-content">
                        <div>
                            <p className="training-stat-label">Upcoming Trainings</p>
                            <p className="training-stat-value">{summary.upcomingSessions}</p>
                        </div>
                        <div className="training-icon-wrapper upcoming-icon">
                            <Clock className="training-icon" />
                        </div>
                    </div>
                </div>
            </div><div className="training-list">
                <h2>Current Training Programs</h2>
                {trainings.map((training) => (
                    <div key={training.id} className="training-card"
                        onClick={(e) => {
                            navigate(`/training/${training.id}`)

                        }}
                        style={{ cursor: 'pointer' }}


                    >
                        <div className="training-header">
                            <h3>{training.title}</h3>
                            <div className="training-actions">
                                <span className={`training-status ${getStatusColor(training.status)}`}>
                                    {training.status}
                                </span>
                                <div className="action-buttons">
                                    <button
                                        className="action-button edit-button"
                                        onClick={(e) => {
                                            openEditModal(training)
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="action-button delete-button"
                                        onClick={(e) => {
                                            openDeleteConfirm(training)
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="training-description">{training.description}</p>

                        <div className="training-details-row">
                            <div className="training-detail-item">
                                <p className="detail-title">Trainer</p>
                                <div className="trainer-info">
                                    <img src={training.trainer.avatar} alt={training.trainer.name} className="trainer-avatar" />
                                    <p className="detail-value">{training.trainer.name}</p>
                                </div>
                            </div>

                            <div className="training-detail-item">
                                <p className="detail-title">Duration</p>
                                <div className='detail-value-container'>
                                    <p className="detail-value">{training.startDate}</p>
                                    <p className="detail-value">{training.endDate}</p>
                                </div>
                            </div>

                            <div className="training-detail-item">
                                <p className="detail-title">Participants</p>
                                <p className="detail-value">{training.participants.length} enrolled</p>
                            </div>

                            <div className="training-detail-item">
                                <p className="detail-title">Progress</p>
                                <div className="progress-bar-container">
                                    <div className="progress-bar">
                                        <div className="progress-filled" style={{ width: `${training.progress}%` }} />
                                    </div>
                                    <p className="progress-percentage">{training.progress}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="training-resources">
                            {training.resources.map((resource, index) => (
                                <a key={index} href={resource.url} className="resource-link">
                                    {getResourceIcon(resource.type)}
                                    <span>{resource.title}</span>
                                </a>
                            ))}
                            {training.certificationAvailable && (
                                <div className="certification-available">
                                    <Award className="icon" />
                                    Certification Available
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showAddTraining && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Add New Training Program</h3>
                            <button
                                onClick={() => setShowAddTraining(false)}
                                className="modal-close-btn"
                            >
                                <X className="icon" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmitTraining}>
                            <div className="form-field">
                                <label>Training Name</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter Training Name"
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>Training Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter Training Description"
                                    required
                                ></textarea>
                            </div>
                            {/* <div className="form-field">
                                <label>Trainer</label>
                                <select
                                    name="trainerId"
                                    value={formData.trainerId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Trainer</option>
                                    <option value="67b2efaafb83a0809e0552e9">Manager</option>
                                    <option value="67b2efaafb83a0809e0552ea">Michael Chen</option>
                                </select>
                            </div> */}



                            <div className="form-field">
                                <label>Trainer</label>
                                <select
                                    name="trainerId"
                                    value={formData.trainerId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Trainer</option>
                                    {trainings?.map((training) => (
                                        <option key={training.trainer.id} value={training.trainer.id}>
                                            {training.trainer.name}
                                        </option>
                                    ))}
                                </select>
                            </div>





                            {/* Start Date and End Date Fields */}
                            <div className="form-field">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Material For Training</label>
                                <input type="file" multiple onChange={(e) => handleFileChange(e, "materialFiles")} />
                            </div>
                            <div className="form-field">
                                <label>Lecture For Training</label>
                                <input type="file" multiple onChange={(e) => handleFileChange(e, "lectureFiles")} />
                            </div>
                            <div className="form-field">
                                <label>Resource For Training</label>
                                <input type="file" multiple onChange={(e) => handleFileChange(e, "resourceFiles")} />
                            </div>
                            <button onClick={handleUpload}>Upload Files</button>

                            <div className="form-field checkbox-field">
                                <input
                                    type="checkbox"
                                    name="certificationAvailable"
                                    checked={formData.certificationAvailable}
                                    onChange={handleInputChange}
                                />
                                <label>Certification Available</label>
                            </div>
                            <div className="form-field checkbox-field">
                                <input
                                    type="checkbox"
                                    name="activeTraining"
                                    checked={formData.activeTraining}
                                    onChange={handleInputChange}
                                />
                                <label>Active Training</label>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowAddTraining(false)}>Cancel</button>
                                <button type="submit">Create Training</button>
                            </div>
                        </form>
                    </div>
                </div>
            )} {/* Edit Training Modal */}
            {showEditTraining && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Edit Training Program</h3>
                            <button
                                onClick={() => setShowEditTraining(false)}
                                className="modal-close-btn"
                            >
                                <X className="icon" />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateTraining}>
                            <div className="form-field">
                                <label>Training Name</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter Training Name"
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>Training Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter Training Description"
                                    required
                                ></textarea>
                            </div>
                            <div className="form-field">
                                <label>Trainer</label>
                                <select
                                    name="trainerId"
                                    value={formData.trainerId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Trainer</option>
                                    <option value="67b2efaafb83a0809e0552e9">Manager</option>
                                    <option value="67b2efaafb83a0809e0552ea">Michael Chen</option>
                                </select>
                            </div>


                            <div className="form-field">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>


                            <div className="form-field">
                                <label>Material For Training</label>
                                <input type="file" multiple onChange={(e) => handleFileChange(e, "materialFiles")} />
                            </div>
                            <div className="form-field">
                                <label>Lecture For Training</label>
                                <input type="file" multiple onChange={(e) => handleFileChange(e, "lectureFiles")} />
                            </div>
                            <div className="form-field">
                                <label>Resource For Training</label>
                                <input type="file" multiple onChange={(e) => handleFileChange(e, "resourceFiles")} />
                            </div>
                            <button onClick={handleUpload}>Upload Files</button>



                            <div className="form-field checkbox-field">
                                <input
                                    type="checkbox"
                                    name="certificationAvailable"
                                    checked={formData.certificationAvailable}
                                    onChange={handleInputChange}
                                />
                                <label>Certification Available</label>
                            </div>
                            <div className="form-field checkbox-field">
                                <input
                                    type="checkbox"
                                    name="activeTraining"
                                    checked={formData.activeTraining}
                                    onChange={handleInputChange}
                                />
                                <label>Active Training</label>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowEditTraining(false)}>Cancel</button>
                                <button type="submit">Update Training</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}





            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content delete-modal">
                        <div className="modal-header">
                            <h3>Confirm Delete</h3>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="modal-close-btn"
                            >
                                <X className="icon" />
                            </button>
                        </div>
                        <div className="delete-confirmation-content">
                            <AlertCircle className="delete-warning-icon" />
                            <p>Are you sure you want to delete the training program <strong>"{currentTraining.title}"</strong>?</p>
                            <p className="delete-warning">This action cannot be undone.</p>
                        </div>
                        <div className="modal-actions">
                            <button type="button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                            <button type="button" className="delete-confirm-btn" onClick={handleDeleteTraining}>Delete Training</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingAndLearning;