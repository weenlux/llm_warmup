# 3. Core Technologies

## Chapter 3.1: Deep Learning Frameworks

#### Ecosystem
- **Keras:** High-level API (integrated)
- **TensorFlow Hub:** Pre-trained models
- **TF Extended:** Production ML pipelines

### Hugging Face Ecosystem

#### Transformers Library
- **Purpose:** Pre-trained NLP models
- **Models:** 100,000+ models available
- **Easy API:** Load and use in 3 lines

```python
from transformers import pipeline
classifier = pipeline("sentiment-analysis")
result = classifier("I love this!")
```

#### Hub Features
- Model hosting and sharing
- Datasets repository
- Spaces (ML demos)
- Community collaboration

#### Popular Models
- BERT, GPT-2, T5, BART
- LLaMA, Mistral, Falcon
- Vision transformers (ViT)

### LangChain

#### What is LangChain?
- Framework for LLM applications
- Chain multiple components
- Simplifies complex workflows

#### Key Concepts

**Chains**
- Sequential operations
- Combine multiple steps
- Reusable components

**Agents**
- Decision-making capabilities
- Tool usage
- Multi-step reasoning

**Memory**
- Conversation history
- Long-term storage
- Context management

#### Use Cases
- Chatbots and assistants
- Document Q&A systems
- Automated workflows
- Data analysis agents

---

## Chapter 3.2: Development Tools

### Jupyter Notebooks

#### Features
- Interactive code execution
- Inline visualizations
- Markdown documentation
- Easy experimentation

#### Best Practices
- Clear cell organization
- Reproducible workflows
- Version control (with nbdime)
- Export to scripts for production

### Cloud Notebooks

#### Google Colab
- **Pros:** Free GPU/TPU, no setup
- **Best for:** Quick experiments, learning
- **Limits:** Session timeouts, storage

#### Kaggle Notebooks
- **Pros:** Free GPU, datasets integrated
- **Best for:** Competitions, sharing
- **Community:** Large ML community

#### Alternatives
- **Paperspace Gradient:** Persistent storage
- **Deepnote:** Team collaboration
- **Amazon SageMaker Studio:** Enterprise

### Version Control with Git

#### Essential Commands
```bash
git init
git add .
git commit -m "message"
git push origin main
```

#### ML-Specific Tools
- **DVC:** Data version control
- **Git LFS:** Large file storage
- **nbdime:** Notebook diffing

### Docker & Containerization

#### Why Docker?
- Reproducible environments
- Dependency management
- Easy deployment
- Consistency across systems

#### Basic Dockerfile
```dockerfile
FROM python:3.10
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

#### Use Cases
- Model deployment
- Development environments
- CI/CD pipelines
- Team collaboration

---

## Chapter 3.3: Cloud Platforms

### Amazon Web Services (AWS)

#### SageMaker
- **Purpose:** End-to-end ML platform
- **Features:** Training, deployment, monitoring
- **Notebooks:** Jupyter integration
- **AutoML:** Automatic model building

#### Amazon Bedrock
- **Purpose:** Foundation models API
- **Models:** Claude, Titan, Stable Diffusion
- **Features:** No infrastructure management
- **RAG:** Knowledge base integration

#### Other AWS Services
- **EC2:** Virtual machines with GPUs
- **S3:** Data storage
- **Lambda:** Serverless inference

### Google Cloud Platform (GCP)

#### Vertex AI
- **Purpose:** Unified ML platform
- **Training:** Custom and AutoML
- **Deployment:** Scalable endpoints
- **MLOps:** Experiment tracking, pipelines

#### AI APIs

#### Compute Options
- **Compute Engine:** VMs with GPUs/TPUs
- **Cloud Run:** Containerized deployment
- **TPUs:** Tensor Processing Units

### Choosing a Platform

#### Considerations
- **Cost:** Pricing models vary
- **Ecosystem:** Existing infrastructure
- **Services:** Specific features needed
- **Support:** Documentation and help
- **Compliance:** Data regulations

#### Cost Optimization
- Use spot/preemptible instances
- Auto-scaling
- Reserved capacity
- Monitor usage
