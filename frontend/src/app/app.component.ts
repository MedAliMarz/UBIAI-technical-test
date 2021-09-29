import { Component, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, E, ENTER, S } from '@angular/cdk/keycodes';

import { FormControl } from '@angular/forms';
export interface Label {
  name: string;
  color?: string;
}

export interface Annotation {
  text: string;
  start: number;
  end: number;
  label: Label | null;
}

export interface Word {
  text: String;
  label: Label | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('colorPicker') colorPicker: any;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  selectionObj: any;
  labels: Label[] = [];
  text = new FormControl(
    `
    Computers can't process visual information the way human brains do: A computer needs to be told what it's interpreting and provided context in order to make decisions. Data annotation makes those connections. It's the human-led task of labeling content such as text, audio, images and video so it can be recognized by machine learning models and used to make predictions.

    Data annotation is both a critical and impressive feat when you consider the current rate of data creation. By 2025, an estimated 463 exabytes of data will be created globally on a daily basis, according to The Visual Capitalist — and that research was done before the COVID-19 pandemic accelerated the role of data in daily interactions. Now, the global data annotation tools market is projected to grow nearly 30% annually over the next six years, according to GM Insights, especially in the automotive, retail and healthcare sectors.`
  );
  words: Word[] = this.text.value
    .replace('\n', ' ')
    .split(' ')
    .map((word: String) => ({ text: word, label: null }));
  annotations: Annotation[] = [];
  currentLabel: Label | null = null;
  isSelect = false;

  onLabelChange(event: any, label: any) {
    if (event && event.selected) {
      this.currentLabel = label;
    }
  }
  onDeleteWord($event: any, word: Word) {
    this.removeAnnotation(word);
  }
  onMouseDown(event: MouseEvent) {
    this.selectionObj = window.getSelection();
  }
  onMouseUp(event: MouseEvent) {
    let startWord: String, endWord: String;
    if (
      this.selectionObj.focusOffset === this.selectionObj.anchorOffset ||
      !this.currentLabel
    ) {
      return;
    }
    if (this.selectionObj.focusOffset > this.selectionObj.anchorOffset) {
      // selection left -> right
      startWord = this.selectionObj.anchorNode.data;
      endWord = this.selectionObj.focusNode.data;
    } else {
      // selection right -> left
      startWord = this.selectionObj.focusNode.data;
      endWord = this.selectionObj.anchorNode.data;
    }
    const startIndex = this.text.value.indexOf(startWord);
    const endIndex = this.text.value.indexOf(endWord) + endWord.length;
    const annotationText = this.text.value.substr(
      startIndex,
      endIndex - startIndex
    );
    this.addAnnotation(
      startIndex,
      endIndex,
      startWord,
      endWord,
      annotationText
    );
  }

  addAnnotation(
    startIndex: number,
    endIndex: number,
    startWord: String,
    endWord: String,
    annotationText: string
  ) {
    // add annotation to the array
    this.annotations.push({
      start: startIndex,
      end: endIndex,
      text: annotationText.trim(),
      label: this.currentLabel,
    });

    // add a word annotation to the words array
    const wordStartIndex = this.words.findIndex(
      (word) => word.text === startWord.trim()
    );
    const wordEndIndex = this.words.findIndex(
      (word) => word.text === endWord.trim()
    );
    const newWord: Word = {
      text: '',
      label: this.currentLabel,
    };
    for (let index = wordStartIndex; index <= wordEndIndex; index++) {
      newWord.text = newWord.text.concat(
        this.words[index].text.toString(),
        index !== wordEndIndex ? ' ' : ''
      );
    }
    // remove the extra words and replace them with one single word
    this.words.splice(
      wordStartIndex,
      wordEndIndex - wordStartIndex + 1,
      newWord
    );
  }
  removeAnnotation(wordToDelete: Word) {
    // remove word annotation from the words array
    const annoWordsIndex = this.words.indexOf(wordToDelete);
    const extraWords = this.words[annoWordsIndex].text.split(' ');

    // add back the extra words in the right places
    this.words.splice(
      annoWordsIndex,
      1,
      ...extraWords.map((word: string) => ({ text: word, label: null }))
    );

    // remove annotation from the array
    const annoIndex = this.annotations.findIndex(
      (word) =>
        word.text === wordToDelete.text &&
        word.label?.name === wordToDelete.label?.name
    );
    this.annotations = this.annotations.splice(annoIndex, 1);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.colorPicker.nativeElement.oninput = (e: any) => {
        e.preventDefault();
        this.labels.push({ name: value, color: e.target.value });
        event.chipInput!.clear();
      };
      this.colorPicker.nativeElement.click();
    }
  }

  remove(label: Label): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  onExportAnnotation() {
    const fileContent = JSON.stringify({
      document: this.text.value,
      annotations: this.annotations.map((anno) => ({
        ...anno,
        label: anno.label?.name,
      })),
    });
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/json;charset=UTF-8,' + encodeURIComponent(fileContent)
    );
    element.setAttribute('download', 'annotations.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
