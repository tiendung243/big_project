from django_elasticsearch_dsl import Document, fields, Index
from .models import Question

PUBLISHER_INDEX = Index('question_index')

PUBLISHER_INDEX.settings(
    number_of_shards=1,
    number_of_replicas=1
)


@PUBLISHER_INDEX.doc_type
class QuestionDocument(Document):
    id = fields.IntegerField(attr='id')
    fielddata = True
    content = fields.TextField(fields={
        "raw": {
            "type": 'keyword'
        }
    })
    title = fields.TextField(fields={
        "raw": {
            "type": 'keyword'
        }
    })

    class Django:
        model = Question
