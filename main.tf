terraform {
  required_providers {
    firebase = {
      source = "terraform-providers/firebase"
      version = "~> 0.2"
    }
  }
}

provider "firebase" {
  project = "terraform-firebase-xxxxx"
  database = "default"
}

resource "firebase_firestore_document" "document" {
  depends_on = [firebase_firestore_collection.collection]
  collection = firebase_firestore_collection.collection.id
  document_id = "test"
  data = <<EOF
{
  "name": "test",
  "value": "test"
}
EOF
}

resource "firebase_firestore_collection" "collection" {
  depends_on = [firebase_project.default]
  project = firebase_project.default.id
  database = firebase_project.default.database
  collection_id = "test"
}
